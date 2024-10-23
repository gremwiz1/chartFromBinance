import React, { useState } from 'react';
import CandlestickChart from './components/candlestickChart';

const App: React.FC = () => {
    const [interval, setInterval] = useState<string>('1h'); // Состояние для выбора таймфрейма

    return (
        <div className="App">
            <h1>Свечной график BTC/USDT</h1>
            <div>
                {/* Кнопки для изменения интервала отображения графика */}
                <button onClick={() => setInterval('1h')}>1 час</button>
                <button onClick={() => setInterval('5m')}>5 минут</button>
            </div>
            {/* Компонент графика с передачей выбранной пары и интервала */}
            <CandlestickChart symbol="BTCUSDT" interval={interval} />
        </div>
    );
};

export default App;
