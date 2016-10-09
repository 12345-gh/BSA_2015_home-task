    /*
      Создать сущность Student, которая является наследником сущности Man. 
      Man содержит свойства name, age и метод live. 

      Student не содержит явно данных свойств, но наследует их у Man. 
      В свою очередь он содержит метод study.

      Задание должно быть реализовано каждым из следующих способов:
      1 - прототипное наследование через функции-конструкторы
      2 - наследование через конструкцию Object.create()
    */
    
    function throwErr(mssg){
        throw new Error(mssg);
    }

    console.log('Task 1');
    // construct the object Man and live method
    function Man(name, age) { 
        if ((name !== undefined) && (age !== undefined)) {
            this.name = typeof name === "string" ? name : throwErr("Bad Man name");
            this.age =  ((typeof age === "number") &&
                               (age > 18) &&
                               (age < 100)) ? age : throwErr("Bad Man age");
        }
    }
    Man.prototype.live = function () {
        return ('Hi my name is ' + this.name + '. I live in Some City');
    };

    // define a Student object and study method
    function Student(name, age) {
        // functions Student invoke Man passing this and name and age
        Man.call(this, name, age);
    }
        
    // inherits properties and methods from Man
    Student.prototype = new Man();
    
    // Man create before Student.prototype.study
    Student.prototype.study = function () {
            return ('Study student 1');
    };

    // set its prototype to be a new instance of Man and Student
    var man = new Man('Petya', 22);
    var stud = new Student('Vasya', 19);

    console.log(man.live());
    console.log(stud.live());
    console.log(stud.study());

    console.log('Task 2');
    // define the Man object
    var Man_2 = {
        constructor: function (name, age) {
            if ((name !== undefined) && (age !== undefined)) {
                this.name = typeof name === "string" ? name : throwErr("Bad Man name");
                this.age =  ((typeof age === "number") &&
                             (age > 18) &&
                             (age < 100)) ? age : throwErr("Bad Man age");
                this.live = function () {
                    return ('Hi my name is ' + this.name + '. I live in Some City');
                };
                return this;
            }
        }
    };

    // inherits from Man 
    var Student_2 = Object.create(Man_2);

    var man_2 = new Man_2.constructor('Sergey', 27);
    var stud_2 = new Student_2.constructor('Andrey', 20);

    stud_2.study = function () {
        return ('Study student 2');
    };

    console.log(man_2.live());
    console.log(stud_2.live());
    console.log(stud_2.study());

    /*Реализовать функции duckType(), которая принимает объект Student или Man и возвращает его тип 
      не используя оператор instanceof, а проверяя наличие свойств/методов объектов.
    */
    console.log('Task: create function duckType(obj)');

    function duckType(obj) {
        // check down the object's prototype chain or direct property of object 
        // and type of object property
        if (obj instanceof Object) {
            if ((obj.name) && (obj.age) && (obj.live)) {
                if (obj.study) {
                    return "Student";
                } else {
                    return "Man";
                }
            } else {
                return undefined;
            }
         } else {
            throwErr("This is not an Object");     
         }
    }

    console.log('Test: man = ' + duckType(man));
    console.log('Test: stud = ' + duckType(stud));
    console.log('Test: man_2 = ' + duckType(man_2));
    console.log('Test: stud_2 = ' + duckType(stud_2));



    /*Модифицировать функцию так, что она не принимает объект, а оперирует с объектом this. 
    Функция объявляется вне контекста, но вызывается на определенном объекте при помощи call/apply/bind.
    */
    console.log('Task: create function duckType()');

    function duckTypeModify() {
        if (this instanceof Object) {
            if ((this.name) && (this.age) && (this.live)) {
                if (this.study) {
                    return "Student";
                } else {
                    return "Man";
                }
            } else {
                return undefined;
            }
        } else {
            throwErr("This is not an Object");     
        }
    }

    console.log('Test modify: man = ' + duckTypeModify.call(man));
    console.log('Test modify: stud = ' + duckTypeModify.call(stud));
    console.log('Test modify: man_2 = ' + duckTypeModify.call(man_2));
    console.log('Test modify: stud_2 = ' + duckTypeModify.call(stud_2));

    // define a Professor object
    function Professor(name, age) {
        Student.call(this, name, age);
        this.numberOfStudents = 0;
        this.numberOfArticles = 0;
    }
        
    // inherits properties and methods from Student
    Professor.prototype = new Student();
    
    Professor.prototype.teach = function () {
            return ('Lecture 1. Introduce');
    };
    
    Professor.prototype.hasArticle = function () {
        var arr = Array.prototype.slice.call(arguments),
            article = this.numberOfArticles;
        
        arr.forEach(function (value) {
            article += (typeof value === "number") ? value : throwErr("Bad value"); 
        });
        
        if (article < 0) {
            throwErr("The sum of article less than zero");     
        }
        
        return article;
    };

    Professor.prototype.addStudents = function (value) {
        if (value < 0) {
            throwErr("The value of student less than zero");     
        }
        this.numberOfStudents += (typeof value === "number") ? value : throwErr("Bad value"); 
    };

    Professor.prototype.removeStudents = function (value) {
        if (value < 0) {
            throwErr("The value of student less than zero");     
        }
        this.numberOfStudents -= (typeof value === "number") ? value : throwErr("Bad value"); 
    };

    var profes = new Professor('Alik', 49);

    profes.numberOfArticles = profes.hasArticle(20,10,20);

    console.log(profes.live());
    console.log(profes.teach());
    console.log(profes.numberOfArticles);
    