<?php namespace App\Http\Controllers;

use App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use GuzzleHttp;
use App\Models\User;
use App\Models\Voto;
use \Firebase\JWT\JWT;

class UserController extends Controller {

	protected function createToken($user)
    {
        $payload = [
            'user' => $user,
            'iat' => time(),
            'exp' => time() + (2 * 7 * 24 * 60 * 60)
        ];
        return JWT::encode($payload, getenv('APP_KEY'));
    }

	public function login(Request $request)
	{
		
		$accessToken = $request->get("accessToken");
		$userID = $request->get("userID");

		$profile_data = join(',',array(
            'id',
            'first_name',
            'last_name',
            'name',
            'email'
        ));

        $client = new GuzzleHttp\Client([
                'base_uri' => "https://graph.facebook.com/"
        ]);

        $profile = $client->get(
            '/me?access_token=' . $accessToken . '&fields=' . $profile_data
        );

        $profile = json_decode($profile->getBody(), true);

        if ($profile['id'] != $userID) return response()->json(['msg' => 'Datos incorrectos'], 409);

        $user = User::where(['email' => $profile['email']])->first();

        if ($user) {
        	$user->oauth_token = $accessToken;
        } else {
        	$user = new User();

        	$user->name = $profile['first_name'] . ' ' . $profile['last_name'];
        	$user->email = $profile['email'];
        	$user->fb_id = $profile['id'];
        	$user->oauth_token = $accessToken;
        }

        $user->save();

        return response()->json(['token' => $this->createToken($user["id"])]);
	}

	public function me(Request $request) {
		$data = User::where('id', $request["user"])->first();
        $data['voto'] = (count($data->votos()->get()) > 0) ? $data->votos()->get()[0]->opcion : false ;
        return response()->json($data);
	}

    public function vote(Request $request) {
        $user = User::where('id', $request["user"])->first();
        if (count($user->votos()->get()) == 0) {
            $opcion = $request->get("opcion");

            $voto = new Voto();
            $voto->user_id = $user->id;
            $voto->opcion = $opcion;

            $voto->save();

            return response()->json(['msg' => 'ok']);
        } else {
            return response()->json(['msg' => 'Ya votaste'], 401);
        }
    }

    public function getVotos(Request $request) {
        $data = Voto::select('opcion', \DB::raw("count(opcion) as count"))->groupBy('opcion')->get();
        $total = Voto::count();

        foreach ($data as $key => $opcion) {
            $data[$key]->count = round(($data[$key]->count * 100) / $total);
        }
        return response()->json(['opciones' => $data, "total" => $total]);
    }
}