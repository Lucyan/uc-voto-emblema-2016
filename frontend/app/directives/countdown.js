votoEmblemaAPP.directive('countdown', [
    'Util',
    '$interval',
    function (Util, $interval) {
        return {
            restrict: 'A',
            scope: { date: '@' },
            link: function (scope, element) {
                var future;
                future = new Date(scope.date);
                $interval(function () {
                    var diff;
                    diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
                    return element.empty().append(Util.dhms(diff));
                }, 1000);
            }
        };
    }
]).factory('Util', [function () {
    return {
        dhms: function (t) {
            var days, hours, minutes, seconds;
            days = Math.floor(t / 86400);
            t -= days * 86400;
            hours = Math.floor(t / 3600) % 24;
            t -= hours * 3600;
            minutes = Math.floor(t / 60) % 60;
            t -= minutes * 60;
            seconds = t % 60;
            return [
                '<span class="item dias">&nbsp;&nbsp;' + days + '&nbsp;&nbsp;<span class="label">Dias</span></span> : ',
                '<span class="item horas">&nbsp;&nbsp;' + hours + '&nbsp;&nbsp;<span class="label">Horas</span></span> : ',
                '<span class="item minutos">&nbsp;&nbsp;' + hours + '&nbsp;&nbsp;<span class="label">Minutos</span></span>'
            ].join('');
        }
    };
}]);