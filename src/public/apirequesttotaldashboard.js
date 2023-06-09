$(document).ready(function() {
    const options = {
        method: "GET",
    }
    let url = new Request("/totaldashboard/data", options);
    fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((resparset) => {
            name_dashboard = []
            data = []
            for (let i in resparset) {
                name_dashboard.push(resparset[i].dashboard)
                data.push({ value: resparset[i].total, name: resparset[i].dashboard })
            }
            var dom = document.getElementById("container2");
            var myChart = echarts.init(dom);

            var option;

            option = {
                title: {
                    text: 'Equipos en Dashhboard',
                    subtext: 'Totales',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b} : {c} Dispositivos'
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    name_dashboard
                },
                series: [{
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
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