 $(document).ready(function() {
    const cartel = document.getElementById('cartel');
    const options = {
        method: "GET",
    }
    let request_query = new Request("/get/carteles/", options);
    fetch(request_query)
        .then((res) => {
            return res.json();
        })
        .then((response_query) => {
            for (let i in response_query) {
                var tipe = document.createElement('button');
                tipe.classList.add('dropdown-item');
                tipe.textContent = response_query[i].id_cartel;
                cartel.appendChild(tipe);
            }
        })
        .catch((error) => {
            console.log(`Error processing request ${error}`);
        })
    $(document).on('click', '.dropdown-menu button', function() {
        const options = {
            method: "POST",
            body: new URLSearchParams({
                cartel: $(this).html()

            }),
        }
        let request_query = new Request("/total/aceptaciones/cartel/", options);
        fetch(request_query)
            .then((res) => {
                return res.json();
            })
            .then((response_query) => {
                name_dashboard = ["Total Centros Educativos", "Aceptaciones", "NO Aceptacionees"]
                let total_register = response_query["data_total_ce"][0].totalce
                let acceptances = response_query["data_aceptaciones"][0].totalce
                let no_acceptances = response_query["data_no_aceptaciones"][0].totalce
                let label_information = [total_register, acceptances, no_acceptances]
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
                        name: 'Cantidad CE',
                        type: 'bar',
                        barWidth: '40%',
                        data: label_information
                    }]
                };

                if (option && typeof option === 'object') {
                    myChart.setOption(option);
                }

                window.addEventListener('resize', myChart.resize);
            })
            .catch((error) => {
                console.log(`Error processing request ${error}`);
                alert("Se debe registrar el Total de Centros Educativos para el Cartel");
            })

    });

});