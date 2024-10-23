import React, { useState, useCallback } from 'react';
import CandlestickChart from './components/candlestickChart';

const App: React.FC = () => {
    const [timeframe, setTimeframe] = useState<string>('1h'); 

    // Создаем мемоизированные функции для изменения таймфрейма
    const handleSetTimeframe1h = useCallback(() => setTimeframe('1h'), []);
    const handleSetTimeframe5m = useCallback(() => setTimeframe('5m'), []);

    return (
        <div className="App">
            <h1>Свечной график BTC/USDT</h1>
            <div>
                {/* Используем мемоизированные функции для изменения интервала */}
                <button onClick={handleSetTimeframe1h}>1 час</button>
                <button onClick={handleSetTimeframe5m}>5 минут</button>
            </div>
            {/* Компонент графика с передачей выбранной пары и интервала */}
            <CandlestickChart symbol="BTCUSDT" interval={timeframe} />
        </div>
    );
};

export default App;
