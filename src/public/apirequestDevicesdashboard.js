 $(document).ready(function() {
    $(document).on('click', '.dropdown-menu button', function() {
        const options = {
            method: "POST",
            body: new URLSearchParams({
                data: $(this).html()
            }),
        }
        let url = new Request("/total/devices/dasboard/", options);
        fetch(url)
            .then((res) => {
                return res.json();
            })
            .then((response_query) => {
                name_dashboard = []
                Aps = []
                Switch = []
                Router = []
                data = []
                for (let i in response_query) {
                    tipo = response_query[i].id_tipo
                    if (tipo.startsWith("UTM") || tipo.startsWith("ROUTER")) {
                        Router.push({ value: response_query[i].cantidadEquipo, name: response_query[i].modelo })
                    } else if (tipo.startsWith("SWITCH")) {
                        Switch.push({ value: response_query[i].cantidadEquipo, name: response_query[i].modelo })
                    } else {
                        Aps.push({ value: response_query[i].cantidadEquipo, name: response_query[i].modelo })
                    }
                    name_dashboard.push(response_query[i].modelo + "\n" + tipo)
                    data.push(response_query[i].cantidadEquipo)
                }
                var dom = document.getElementById('container');
                var myChart = echarts.init(dom, null, {
                    renderer: 'canvas',
                    useDirtyRect: false
                });
                var app = {};

                var option;

                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: name_dashboard,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        name: 'Cantidad Equipos',
                        type: 'bar',
                        barWidth: '40%',
                        data: data
                    }]
                };

                if (option && typeof option === 'object') {
                    myChart.setOption(option);
                }

                window.addEventListener('resize', myChart.resize);
            })
            .catch((error) => {
                console.log(`Error processing request ${error}`);
            })

    });

});