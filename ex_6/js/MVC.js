/*jshint browser:true */

/* Model */
var Model = function(pObj){
    var obj = pObj || {};
    
    /* Create recived object or object with define value */
    this.name = obj.name || '-';
    this.age = obj.age || 0;
    this.year = obj.year || 0;
    this.examsTaken = obj.examsTaken || 0;
    this.takeExam = obj.takeExam || function(){
                                        this.examsTaken++;
                                        this.changed = true;
                                    };
    return this;
};

/* Create new Model */ 
var Student = new Model({
    name: 'Piotr',
    age: 22,
    year: 5,
    examsTaken: 2,
    takeExam: function(){
        this.examsTaken++;
        this.changed = true;
    }
});

/* Controller */
var Controller = function(pModel){
    var modelObj = pModel || Model;

    /* Insert result function render in the document for the value of the model elementId */ 
    document.getElementById(modelObj.elementId).innerHTML = modelObj.render(); 
    
    /* Method which update document elementId if changed is true */
    this.checkModelChanged = function () {
        if (modelObj.model.changed) {
            /* Insert result function render in the document for the value of the model elementId */ 
            document.getElementById(modelObj.elementId).innerHTML = modelObj.render();
            modelObj.model.changed = false;
        }
    };
    
    setInterval(this.checkModelChanged, 100);
        
    return modelObj;
};

/* Create new Controller */
var StudentController = new Controller({
    model: Student,
    elementId: 'student-container',
    render: function(){
        return '<span>' + this.model.name + ' ' + this.model.examsTaken +
            '</span><button id="student-exams-button">Increase exams taken</button>';
    },
    clickHandlers: {
        '#student-exams-button': 'updateExams'
    },
    updateExams: function(){
        this.model.takeExam();
    }
});

/* Click method which find our button and call clickHandlers method */
document.onclick = function (e) {
    /* Check click event for different browser */
    e = e || window.event;
    var target = e.target || e.srcElement;
    /* Get id clicked element */
    var clickedElemId = target.id; 
    if(clickedElemId.indexOf('#') === -1) {
        clickedElemId = '#' + clickedElemId;
    }
    /* Compare it with clickHandlers elements */
	var func = StudentController.clickHandlers[clickedElemId];
    if (func !== undefined && func !== null) {
        /* Execute clickHandlers function by name */
        StudentController[func]();    
    }    
};