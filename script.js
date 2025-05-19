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
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center">
          <h1 className="text-3xl font-bold mb-6">CodeQuest: C++</h1>
          <p className="mb-4">Выберите ваш уровень знаний:</p>
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
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
          <div className="text-right">
            <p>Ранг: {rank}</p>
            <p>XP: {xp}</p>
          </div>
        </div>
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-2">Теория</h2>
          <p>{currentLesson.theory}</p>
        </div>
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-2">Пример кода</h2>
          <pre className="bg-gray-800 text-white p-4 rounded">{currentLesson.exampleCode}</pre>
        </div>
        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-2">{currentLesson.task.title}</h2>
          <p>{currentLesson.task.description}</p>
          <p><strong>Ввод:</strong> {currentLesson.task.input}</p>
          <p><strong>Вывод:</strong> {currentLesson.task.output}</p>
          <button className="btn btn-primary mt-4" onClick={completeTask}>Отправить решение</button>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Тест</h2>
          <p>{currentLesson.test.question}</p>
          <div className="space-y-2">
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
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CodeQuest: C++</h1>
        <div className="text-right">
          <p>Ранг: {rank}</p>
          <p>XP: {xp}</p>
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Добро пожаловать, {userLevel}!</h2>
        <p className="mb-4">Начните своё путешествие в мир олимпиадного программирования!</p>
        <button className="btn btn-primary" onClick={startLesson}>Начать урок: Переменные</button>
        <button className="btn btn-secondary ml-4">PvP Бой (скоро)</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
