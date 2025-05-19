const { useState, useEffect } = React;

const App = () => {
  const [userLevel, setUserLevel] = useState(null);
  const [xp, setXp] = useState(0);
  const [rank, setRank] = useState('Бронза');
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    const savedLevel = localStorage.getItem('userLevel');
    const savedXp = localStorage.getItem('xp');
    if (savedLevel) setUserLevel(savedLevel);
    if (savedXp) setXp(parseInt(savedXp));
  }, []);

  useEffect(() => {
    localStorage.setItem('userLevel', userLevel);
    localStorage.setItem('xp', xp);
    if (xp >= 1000) setRank('Серебро');
    else if (xp >= 500) setRank('Бронза');
  }, [userLevel, xp]);

  const selectLevel = (level) => {
    setUserLevel(level);
  };

  const completeTask = () => {
    setXp(xp + 50);
    alert('Задача решена! +50 XP');
  };

  const startLesson = () => {
    setCurrentLesson({
      title: 'Переменные в C++',
      theory: 'Переменные — это именованные области памяти для хранения данных. В C++ переменные нужно объявлять с указанием типа, например: `int x = 5;`...',
      exampleCode: `#include <iostream>\nusing namespace std;\nint main() {\n  int x = 5;\n  cout << x << endl;\n  return 0;\n}`,
      task: {
        title: 'Сумма двух чисел',
        description: 'Даны два числа a и b. Выведите их сумму.',
        input: '3 4',
        output: '7'
      },
      test: {
        question: 'Какой тип используется для целых чисел?',
        options: ['int', 'float', 'string', 'bool'],
        answer: 'int'
      }
    });
  };

  if (!userLevel) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card text-center">
          <h1 className="title">CodeQuest: C++</h1>
          <p className="subtitle">Выбери свой уровень и начни путь к олимпиадам!</p>
          <div className="space-y-4">
            <button className="btn btn-primary w-full" onClick={() => selectLevel('Новичок')}>Новичок</button>
            <button className="btn btn-primary w-full" onClick={() => selectLevel('Средний')}>Средний</button>
            <button className="btn btn-primary w-full" onClick={() => selectLevel('Продвинутый')}>Продвинутый</button>
          </div>
        </div>
      </div>
    );
  }

  if (currentLesson) {
    return (
      <div className="flex items-center justify-center min-h-screen py-8">
        <div className="card">
          <h1 className="title">{currentLesson.title}</h1>
          <div className="flex justify-between mb-6">
            <div>
              <p className="subtitle">Ранг: {rank}</p>
            </div>
            <div className="text-right">
              <p className="subtitle">XP: {xp}</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${(xp % 500) / 5}%` }}></div>
              </div>
            </div>
          </div>
          <div className="lesson-card">
            <h2 className="text-2xl font-semibold mb-4">Теория</h2>
            <p className="text-gray-700">{currentLesson.theory}</p>
          </div>
          <div className="lesson-card">
            <h2 className="text-2xl font-semibold mb-4">Пример кода</h2>
            <pre className="code-block">{currentLesson.exampleCode}</pre>
          </div>
          <div className="lesson-card">
            <h2 className="text-2xl font-semibold mb-4">{currentLesson.task.title}</h2>
            <p className="text-gray-700">{currentLesson.task.description}</p>
            <p className="mt-2"><strong>Ввод:</strong> {currentLesson.task.input}</p>
            <p><strong>Вывод:</strong> {currentLesson.task.output}</p>
            <button className="btn btn-primary mt-6 w-full" onClick={completeTask}>Отправить решение</button>
          </div>
          <div className="lesson-card">
            <h2 className="text-2xl font-semibold mb-4">Тест</h2>
            <p className="text-gray-700">{currentLesson.test.question}</p>
            <div className="space-y-2 mt-4">
              {currentLesson.test.options.map((option, idx) => (
                <button
                  key={idx}
                  className="btn btn-secondary w-full"
                  onClick={() => {
                    if (option === currentLesson.test.answer) {
                      setXp(xp + 20);
                      alert('Правильно! +20 XP');
                    } else {
                      alert('Неправильно, попробуйте снова.');
                    }
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card text-center">
        <h1 className="title">CodeQuest: C++</h1>
        <p className="subtitle">Добро пожаловать, {userLevel}!</p>
        <div className="progress-bar mx-auto max-w-xs">
          <div className="progress-fill" style={{ width: `${(xp % 500) / 5}%` }}></div>
        </div>
        <p className="subtitle">Ранг: {rank} | XP: {xp}</p>
        <div className="space-y-4">
          <button className="btn btn-primary w-full" onClick={startLesson}>Начать урок: Переменные</button>
          <button className="btn btn-secondary w-full">PvP Бой (скоро)</button>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
