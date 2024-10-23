import axios from 'axios';

// Базовый URL для API Binance
const BASE_URL = 'https://api.binance.com';

// Функция для получения данных о свечах для заданной пары и интервала
export const getCandlestickData = async (symbol: string, interval: string) => {
    try {
        // Выполняем GET-запрос к Binance API с параметрами символа (пары) и интервала
        const response = await axios.get(`${BASE_URL}/api/v3/klines`, {
            params: {
                symbol,
                interval,
                limit: 100 // Ограничиваем количество данных до 100 свечей
            }
        });
        return response.data;
    } catch (error) {
        // Логируем ошибку в случае неудачи
        console.error('Ошибка при получении данных о свечах:', error);
        throw error;
    }
};
