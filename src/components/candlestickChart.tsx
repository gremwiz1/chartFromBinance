import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getCandlestickData } from '../services/binanceApi';

interface CandlestickChartProps {
    symbol: string; // Символ торговой пары, например, "BTCUSDT"
    interval: string; // Интервал таймфрейма, например, "1h" или "5m"
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ symbol, interval }) => {
    const [series, setSeries] = useState<any[]>([]); // Состояние для данных графика
    const [loading, setLoading] = useState<boolean>(true); // Состояние загрузки

    useEffect(() => {
        // Функция для получения данных и форматирования их для графика
        const fetchData = async () => {
            setLoading(true); // Устанавливаем состояние загрузки
            try {
                // Получаем данные о свечах с помощью функции getCandlestickData
                const data = await getCandlestickData(symbol, interval);
                // Проверяем, что данные существуют и являются массивом
                if (data && Array.isArray(data)) {
                    // Форматируем данные для использования в ApexCharts
                    const formattedData = data.map((d: any) => ({
                        x: new Date(d[0]), // Время начала свечи
                        y: [parseFloat(d[1]), parseFloat(d[2]), parseFloat(d[3]), parseFloat(d[4])] // [Open, High, Low, Close]
                    }));
                    // Обновляем состояние для отображения на графике
                    setSeries([{ data: formattedData }]);
                } else {
                    setSeries([]); // Устанавливаем пустой массив, если данные некорректны
                }
            } catch (error) {
                // Логируем ошибку в случае неудачи
                console.error('Ошибка при получении данных:', error);
                setSeries([]); // Устанавливаем пустой массив при ошибке
            } finally {
                setLoading(false); // Сбрасываем состояние загрузки
            }
        };

        fetchData(); // Запускаем функцию получения данных при изменении symbol или interval
    }, [symbol, interval]);

    // Настройки для ApexCharts
    const options = {
        chart: {
            type: 'candlestick' as const, // Указываем тип графика как "candlestick"
            height: 350
        },
        title: {
            text: `${symbol} - ${interval}`, // Заголовок графика
            align: 'left' as const 
        },
        xaxis: {
            type: 'datetime' as const // Указываем тип оси X
        },
        yaxis: {
            tooltip: {
                enabled: true // Включаем всплывающую подсказку на оси Y
            }
        }
    };

    // Если данные загружаются, отображаем сообщение загрузки
    if (loading) {
        return <div>Загрузка данных...</div>;
    }

    return (
        <div id="chart">
            {/* Проверяем, что серия данных не пустая */}
            {series.length > 0 ? (
                <ReactApexChart options={options} series={series} type="candlestick" height={350} />
            ) : (
                <div>Нет данных для отображения</div>
            )}
        </div>
    );
};

export default CandlestickChart;
