describe('My test', function() {
	
	function testName(expected, actual) {
		it("testing name should be " + expected, function() {
			expect(expected).toBe(actual);
            expect(expected).toBeTruthy();
		});
	}
	
	function testAge(expected, actual) {
		it('testing age should be ' + expected, function() {
			expect(expected).toEqual(actual);
            expect(expected).toBeTruthy();
		});
	}
    
    function testBadValue(name, age, errortype) {
        it('test for recive Exeption "'+errortype+'"', function() {
			expect(function(){ 
                new Man (name, age);
            }).toThrowError(errortype);
		});
    }
	
    var manone = new Man('JohnDoe', 20);
    
	describe("Some test for Man Object", function() {

        testBadValue(777, 50, 'Bad Man name');
        
        testBadValue("TestName", 9999,'Bad Man age');
                        
        testName(manone.name, 'JohnDoe');
		
		testAge(manone.age, 20);
		
		it('should get the text "Hi my name is JohnDoe. I live in Some City"', function() {
			expect(manone.live()).toEqual('Hi my name is JohnDoe. I live in Some City');
		});
		
	});
	
    var studone = new Student('WillSmith', 21);
    
	describe("Some test for Student Object", function() {
		
		testName(studone.name, 'WillSmith');
		
		testAge(studone.age, 21);
		
		it('should get the text "Hi my name is WillSmith. I live in Some City"', function() {
			expect(studone.live()).toEqual('Hi my name is WillSmith. I live in Some City');
		});
        
        it('should get the text "Study student 1"', function() {
			expect(studone.study()).toEqual('Study student 1');
		});        
	});
	
    
    var mantwo = new Man_2.constructor('JohnDoe', 20);
    
	describe("Some test for Man_2 Object", function() {

        testBadValue(777, 50, 'Bad Man name');
        
        testBadValue("TestName", 9999,'Bad Man age');
                        
        testName(mantwo.name, 'JohnDoe');
		
		testAge(mantwo.age, 20);
		
		it('should get the text "Hi my name is JohnDoe. I live in Some City"', function() {
			expect(mantwo.live()).toEqual('Hi my name is JohnDoe. I live in Some City');
		});
		
	});
	
    var studtwo = new Student_2.constructor('WillSmith', 21);
    
	describe("Some test for Student_2 Object", function() {
		
		testName(studtwo.name, 'WillSmith');
		
		testAge(studtwo.age, 21);
		
		it('should get the text "Hi my name is WillSmith. I live in Some City"', function() {
			expect(studtwo.live()).toEqual('Hi my name is WillSmith. I live in Some City');
		});
	});
    
    var profone = new Professor('JohnSmith', 60);
    
	describe("Some test for Professor Object", function() {
        
		beforeEach(function() {
			profone.numberOfArticles=0;
            profone.numberOfStudents=0;
		});
        
        testName(profone.name, 'JohnSmith');
		
		testAge(profone.age, 60);

        it('should get the text "Lecture 1. Introduce"', function() {
			expect(profone.teach()).toEqual('Lecture 1. Introduce');
		});  
        		
		it('the number of article should be 7', function() {
			profone.numberOfArticles = profone.hasArticle(1, 2, 4);
            expect(profone.numberOfArticles).toBe(7);	
		});
        
        it('the number of article should be 25', function() {
            profone.numberOfArticles = profone.hasArticle(1, 2, 4);
			profone.numberOfArticles = profone.hasArticle(10, 5, 3);
            expect(profone.numberOfArticles).toBe(25);	
		});
        
        it('the number of article should be 2', function() {
            profone.numberOfArticles = profone.hasArticle(1, 2, 4);
			profone.numberOfArticles = profone.hasArticle(10, 5, 3);
            profone.numberOfArticles = profone.hasArticle(-20,-3);
            expect(profone.numberOfArticles).toBe(2);	
		});
             
        it('test for recive Exeption "Bad value"', function() {
            expect(function(){ 
                profone.numberOfArticles = profone.hasArticle(5,5,'5');
            }).toThrowError('Bad value');
        });	

        it('test for recive Exeption "The sum of article less than zero"', function() {
            expect(function(){ 
                profone.numberOfArticles = profone.hasArticle(5,5,-50);
            }).toThrowError('The sum of article less than zero');
        });	
        
        it('the number of student should be 25', function() {
            profone.addStudents(25);
            expect(profone.numberOfStudents).toBe(25);	
		});
        
        it('the number of student should be 50', function() {
            profone.addStudents(25);
            profone.addStudents(25);
            expect(profone.numberOfStudents).toBe(50);	
		});
             
        it('test for recive Exeption "Bad value"', function() {
            expect(function(){ 
                profone.addStudents('25');
            }).toThrowError('Bad value');
        });	

        it('test for recive Exeption "The value of student less than zero"', function() {
            expect(function(){ 
                profone.addStudents(-50);
            }).toThrowError('The value of student less than zero');
        });	
        
        it('the number of student should be 5', function() {
            profone.addStudents(25);
            profone.removeStudents(20);
            expect(profone.numberOfStudents).toBe(5);	
		});
        
        it('the number of student should be 10', function() {
            profone.addStudents(50);
            profone.removeStudents(20);
            profone.removeStudents(20);
            expect(profone.numberOfStudents).toBe(10);	
		});
             
        it('test for recive Exeption "Bad value"', function() {
            expect(function(){ 
                profone.removeStudents('25');
            }).toThrowError('Bad value');
        });	

        it('test for recive Exeption "The value of student less than zero"', function() {
            expect(function(){ 
                profone.removeStudents(-50);
            }).toThrowError('The value of student less than zero');
        });	
	});		
	
	describe('Some test for duckType() function', function() {
		it('ManOne should be a ' + duckType(manone), function() {
			expect(duckType(manone)).toBe('Man');
		});	
        
		it('ManOne not should be a Student', function() {
			expect(duckType(manone)).not.toBe('Student');
		});
        
        it('ManOne not should be a Professor', function() {
			expect(duckType(manone)).not.toBe('Professor');
		});
        
		
		it('StudOne should be a Student', function() {
			expect(duckType(studone)).toBe('Student');
		});
        
        it('StudOne not should be a Man', function() {
			expect(duckType(studone)).not.toBe('Man');
		});
        
        it('StudOne not should be a Professor', function() {
			expect(duckType(studone)).not.toBe('Professor');
		});
        
        it('ProfOne not should be a Man', function() {
			expect(duckType(profone)).not.toBe('Man');
		});
        
        it('ProfOne should be a Student', function() {
			expect(duckType(profone)).toBe('Student');
		});       
			
		it('Any other object should be equal undefined', function() {
			expect(duckType({})).toEqual(undefined);
		});
        
		it('test for recive Exeption"This is not an Object"', function() {
			expect(duckType).toThrowError('This is not an Object');
		});
	});
    
    describe('Some test for duckTypeModify() function', function() {
		it('ManOne should be a ' + duckTypeModify.call(manone), function() {
			expect(duckTypeModify.call(manone)).toBe('Man');
		});	
        
		it('ManOne not should be a Student', function() {
			expect(duckTypeModify.call(manone)).not.toBe('Student');
		});
        
        it('ManOne not should be a Professor', function() {
			expect(duckTypeModify.call(manone)).not.toBe('Professor');
		});
        
		
		it('StudOne should be a Student', function() {
			expect(duckTypeModify.call(studone)).toBe('Student');
		});
        
        it('StudOne not should be a Man', function() {
			expect(duckTypeModify.call(studone)).not.toBe('Man');
		});
        
        it('StudOne not should be a Professor', function() {
			expect(duckTypeModify.call(studone)).not.toBe('Professor');
		});
        
        it('ProfOne not should be a Man', function() {
			expect(duckTypeModify.call(profone)).not.toBe('Man');
		});
        
        it('ProfOne should be a Student', function() {
			expect(duckTypeModify.call(profone)).toBe('Student');
		});       
			
		it('Any other object should be equal undefined', function() {
			expect(duckTypeModify.call({})).toEqual(undefined);
		});
	});


});