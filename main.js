(function() {
 
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const ageInput = document.getElementById('age');
    const activitySelect = document.getElementById('activity');
    const deficitSelect = document.getElementById('deficitMode');
    const calcBtn = document.getElementById('calcButton');
    
    const caloriesValueSpan = document.getElementById('caloriesValue');
    const caloriesDescSpan = document.getElementById('caloriesDesc');
    const tdeeInfoSpan = document.getElementById('tdeeInfo');
    const primaryTrainAdviceSpan = document.getElementById('primaryTrainAdvice');
    const exerciseTipsContainer = document.getElementById('exerciseTipsContainer');

    function calculateBMR(weight, height, age, isMale) {
        if (isMale) {
            return 10 * weight + 6.25 * height - 5 * age + 5;
        } else {
            return 10 * weight + 6.25 * height - 5 * age - 161;
        }
    }

    function getIsMale() {
        let selectedGender = document.querySelector('input[name="gender"]:checked').value;
        return selectedGender === 'male';
    }

    function validateInputs(height, weight, age) {
        if (isNaN(height) || height <= 0 || height > 280) {
            alert("Пожалуйста, введите корректный рост (от 50 до 280 см)");
            return false;
        }
        if (isNaN(weight) || weight <= 0 || weight > 300) {
            alert("Введите корректный вес (от 10 до 300 кг)");
            return false;
        }
        if (isNaN(age) || age <= 0 || age > 120) {
            alert("Укажите возраст от 1 до 120 лет");
            return false;
        }
        return true;
    }

    window.silentValidate = function(height, weight, age) {
        if (isNaN(height) || height <= 0 || height > 280) return false;
        if (isNaN(weight) || weight <= 0 || weight > 300) return false;
        if (isNaN(age) || age <= 0 || age > 120) return false;
        return true;
    };

    function calculateAndAdvise() {
        let height = parseFloat(heightInput.value);
        let weight = parseFloat(weightInput.value);
        let age = parseInt(ageInput.value);
        let activityFactor = parseFloat(activitySelect.value);
        let deficitFactor = parseFloat(deficitSelect.value);
        let isMale = getIsMale();

        if (!validateInputs(height, weight, age)) return;

        let bmr = calculateBMR(weight, height, age, isMale);
        let tdee = bmr * activityFactor;
        let caloriesForLoss = tdee * deficitFactor;

        const minSafe = isMale ? 1500 : 1200;
        let deficitPercent = Math.round((1 - deficitFactor) * 100);
        let tdeeRounded = Math.round(tdee);
        let finalCalories = Math.round(caloriesForLoss);
        
        if (finalCalories < minSafe) {
            finalCalories = minSafe;
            caloriesDescSpan.innerHTML = `⚠️ Безопасный минимум (${minSafe} ккал). Не рекомендуется опускаться ниже. Дефицит скорректирован.`;
        } else {
            caloriesDescSpan.innerHTML = `Дефицит ${deficitPercent}% от TDEE (${tdeeRounded} ккал/день) • плавное жиросжигание`;
        }
        
        caloriesValueSpan.innerHTML = finalCalories;
        tdeeInfoSpan.innerHTML = `ваш TDEE: ${tdeeRounded} ккал | Базовый обмен: ${Math.round(bmr)} ккал`;

        let bmi = weight / ((height/100) ** 2);
        const ageAbove40 = age > 40;
        
        let trainingType = "";
        let exerciseList = [];
        
        if (bmi >= 30) {
            trainingType = "🏊‍♂️ ПРИОРИТЕТ КАРДИО НИЗКОЙ ИНТЕНСИВНОСТИ: плавание, ходьба, эллипс, велосипед. 🔹 Силовые 2 раза в неделю (легкие веса / собственный вес).";
        } 
        else if (bmi >= 25 && bmi < 30) {
            trainingType = "🔥 КОМБО: ФОКУС НА ЖИРОСЖИГАНИЕ. Рекомендуется 3 кардио (интервальное или умеренное) + 2-3 силовые тренировки для сохранения мышц.";
        }
        else if (bmi >= 18.5 && bmi < 25) {
            if (deficitFactor <= 0.8) {
                trainingType = "🎯 СИЛОВЫЕ + КАРДИО ДЛЯ РЕКОМПОЗИЦИИ: 3 силовые (база) и 2 кардио-сессии высокой интенсивности. Это поможет сжечь жир и подтянуть фигуру.";
            } else {
                trainingType = "⚖️ БАЛАНС: 2-3 силовых и 2 кардио в неделю (бег, велосипед). Увеличьте NEAT-активность (больше шагов).";
            }
        }
        else {
            trainingType = "🍏 СИЛОВЫЕ ПРИОРИТЕТ: Вам важно нарастить мышечную массу, а не худеть агрессивно. Кардио — легкое (2 раза/нед). Добавьте протеин.";
        }
        
        if (ageAbove40 && trainingType.includes("КАРДИО")) {
            trainingType += " Для суставов выбирайте плавание или эллипс. Обязательна разминка и заминка.";
        } else if (ageAbove40) {
            trainingType += " Уделите внимание растяжке и мобильности суставов перед силовыми.";
        }
        
        if (bmi >= 30) {
            exerciseList = [
                "🚶‍♀️ Ежедневная ходьба 6000-8000 шагов (низкий порог).",
                "🏊‍♂️ Плавание брассом / кролем — 30 мин 3 раза в неделю",
                "🦵 Упражнения сидя: подъемы ног, сгибания рук с легкими гантелями",
                "🧘‍♀️ Йога или пилатес для улучшения подвижности"
            ];
        } 
        else if (bmi >= 25) {
            if (isMale) {
                exerciseList = [
                    "🏋️ Жим гантелей стоя / отжимания от пола (3×12) для сохранения мышц",
                    "🏃 Интервальная ходьба: 2 мин быстрый шаг / 1 мин медленный — 20 мин",
                    "🚴 Велотренажер или сайкл — 30 мин среднего темпа",
                    "🍑 Выпады и приседания с весом тела — 3 подхода"
                ];
            } else {
                exerciseList = [
                    "🍑 Приседания сумо + ягодичный мостик (3×15)",
                    "🔥 Кардио-круг: берпи (облегченные), прыжки на месте — 15 мин",
                    "🏋️‍♀️ Тяга верхнего блока или резины к поясу",
                    "🚶‍♀️ Быстрая ходьба в горку на беговой дорожке"
                ];
            }
            if (deficitFactor <= 0.8) exerciseList.push("💪 Добавьте 2 дополнительных силовых дня (спина + грудь)");
        }
        else {
            if (bmi < 18.5) {
                exerciseList = [
                    "🏋️‍♂️ Силовые 3-4 раза в неделю: становая тяга, подтягивания с резиной, жим ногами",
                    "🍗 Увеличьте белок после тренировок для роста мышц",
                    "🧘 Пилатес для улучшения осанки",
                    "🚴 Легкое кардио 1 раз в неделю по желанию"
                ];
            } else {
                exerciseList = [
                    "🏋️‍♀️ Круговая тренировка: приседания, отжимания, планка, выпады (30 сек работы / 15 отдыха)",
                    "🏃 Бег трусцой или интервальный спринт 2 раза/нед",
                    "🤸‍♂️ Скакалка — отличное кардио для жиросжигания",
                    "🧘 Растяжка после каждой тренировки для восстановления"
                ];
            }
        }
        
        if (activityFactor <= 1.375) {
            exerciseList.unshift("🚀 Низкая активность: начните с 15-минутной зарядки утром и увеличивайте NEAT (лифт заменить на лестницу)");
        } else if (activityFactor >= 1.725) {
            exerciseList.push("⚠️ Высокая активность: не забывайте про дни отдыха и качественное восстановление, иначе риск перетренированности.");
        }
        
        if (!isMale && bmi < 27) {
            exerciseList.push("✨ Используйте функциональные тренировки: выпады с резиной, боковые планки, ягодичный мостик.");
        }
        
        const uniqueTips = [...new Map(exerciseList.map(tip => [tip.trim(), tip])).values()];
        const finalTips = uniqueTips.slice(0, 5);
        
        primaryTrainAdviceSpan.innerHTML = trainingType;
        
        if (finalTips.length === 0) {
            exerciseTipsContainer.innerHTML = `<div class="workout-tip">💪 Начните с ходьбы 30 минут в день + базовые приседания и отжимания</div>`;
        } else {
            let tipsHtml = '';
            finalTips.forEach(tip => {
                tipsHtml += `<div class="workout-tip">✔️ ${tip}</div>`;
            });
            exerciseTipsContainer.innerHTML = tipsHtml;
        }
        
        caloriesValueSpan.style.transform = "scale(1.02)";
        setTimeout(() => { if(caloriesValueSpan) caloriesValueSpan.style.transform = ""; }, 200);
    }
    
    function silentCalculate() {
        let height = parseFloat(heightInput.value);
        let weight = parseFloat(weightInput.value);
        let age = parseInt(ageInput.value);
        let activityFactor = parseFloat(activitySelect.value);
        let deficitFactor = parseFloat(deficitSelect.value);
        let isMale = getIsMale();
        
        if (!window.silentValidate(height, weight, age)) {
            caloriesValueSpan.innerHTML = "—";
            caloriesDescSpan.innerHTML = "⚠️ Некорректные данные";
            primaryTrainAdviceSpan.innerHTML = "Введите корректный рост, вес и возраст";
            exerciseTipsContainer.innerHTML = `<div class="workout-tip">📝 Проверьте введённые значения</div>`;
            return;
        }
        
        let bmr = calculateBMR(weight, height, age, isMale);
        let tdee = bmr * activityFactor;
        let caloriesForLoss = tdee * deficitFactor;
        const minSafe = isMale ? 1500 : 1200;
        let finalCalories = Math.round(caloriesForLoss);
        if (finalCalories < minSafe) finalCalories = minSafe;
        
        caloriesValueSpan.innerHTML = finalCalories;
        let tdeeRounded = Math.round(tdee);
        let deficitPercent = Math.round((1 - deficitFactor) * 100);
        caloriesDescSpan.innerHTML = `Дефицит ${deficitPercent}% от TDEE (${tdeeRounded} ккал)`;
        tdeeInfoSpan.innerHTML = `ваш TDEE: ${tdeeRounded} ккал | БМР: ${Math.round(bmr)} ккал`;
        
        let bmi = weight / ((height/100) ** 2);
        let trainingType = "";
        if (bmi >= 30) trainingType = "🏊‍♂️ ПРИОРИТЕТ КАРДИО НИЗКОЙ ИНТЕНСИВНОСТИ + лёгкие силовые";
        else if (bmi >= 25) trainingType = "🔥 КОМБО: кардио 3 раза, силовые 2-3 раза в неделю";
        else if (bmi >= 18.5) trainingType = "⚖️ БАЛАНС силовые / кардио (2-3/2) для тонуса и жиросжигания";
        else trainingType = "🍏 СИЛОВЫЕ ПРИОРИТЕТ: наращивание мышечной массы";
        if (age > 40) trainingType += " • Акцент на профилактику суставов.";
        
        primaryTrainAdviceSpan.innerHTML = trainingType;
        
        let basicTips = [];
        if (bmi >= 30) basicTips = ["🚶‍♀️ Ходьба 6000+ шагов", "🏊‍♂️ Плавание 2-3 раза/нед", "🧘 Йога для гибкости"];
        else if (bmi >= 25) basicTips = ["🏃 Интервальное кардио", "🏋️ Приседания/выпады", "🚴 Велотренажёр"];
        else basicTips = ["🏋️‍♀️ Круговая тренировка", "🤸‍♂️ Скакалка/бег", "🧘 Растяжка"];
        
        let tipsHtml = basicTips.map(t => `<div class="workout-tip">✔️ ${t}</div>`).join('');
        exerciseTipsContainer.innerHTML = tipsHtml || `<div class="workout-tip">✨ Индивидуальный план готов</div>`;
    }
    
    const form = document.getElementById('fitnessForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAndAdvise();
    });
    
    const autoRefreshElements = [heightInput, weightInput, ageInput, activitySelect, deficitSelect];
    
    const newAutoHandler = () => silentCalculate();
    
    genderRadios.forEach(radio => radio.addEventListener('change', newAutoHandler));
    autoRefreshElements.forEach(el => el.addEventListener('input', newAutoHandler));
    activitySelect.addEventListener('change', newAutoHandler);
    deficitSelect.addEventListener('change', newAutoHandler);
    
    calcBtn.addEventListener('click', (e) => {
        e.preventDefault();
        calculateAndAdvise();
    });
    
    silentCalculate();
})();