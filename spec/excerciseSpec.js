describe('transformFirstAndLast', function() {
  it('should_properly_assign_key_and_value_pair', function (){

    var input = ['Marie', 'Kayla', 'Jackson', 'Richard', 'Kyle', 'Sarah', 'Mars', 'Wayne', 'Mary'];

    var output = transformFirstAndLast(input);

    expect(output).not.toBeUndefined();
    expect(typeof output).toBe('object');
    expect(output.Marie).toBe('Mary');
  });

  it('should_not_modify_input_array', function() {
    var input = ['Mars', 'Wayne', 'Mary'];
    var copy = input.slice(0);
    var output = transformFirstAndLast(input);

    expect(input.length).toBe(copy.length);
    expect(copy[0]).toBe(input[0]);
    expect(copy[1]).toBe(input[1]);
    expect(copy[2]).toBe(input[2]);
  });
});

describe('getAllKeys', function() {
  it('should_output_an_array_of_key_names', function(){
    var input = {
      foo: 'bar',
      level: 1,
      red: 'green',
      number: true
    }
    var expected = Object.keys(input);
    var actual = getAllKeys(input);

    expect(actual).not.toBeUndefined();
    expect(actual[0]).toBe(expected[0]);
    expect(actual[1]).toBe(expected[1]);
    expect(actual[2]).toBe(expected[2]);
    expect(actual[3]).toBe(expected[3]);
  });

  it ('should_not_use_restricted_methods', function() {
    var body = getAllKeys.toString();

    expect(/Object\.keys/.test(body)).toBe(false);
  });
});

describe('fromListToObject', function() {
  var input;
  beforeEach(function(){
    input = [
      ['some', 'like'],
      ['first', 'second'],
      ['mike', 'ike'],
      ['Falco', 'Fox'],
      ['melee', 'brawl']
    ];
  })
  it('should return an object', function () {
    var output = fromListToObject(input);
    expect(typeof output).toBe("object");
    expect(Array.isArray(output)).toBe(false);
  })
  it('converts a list to an object', function() {
    var output = fromListToObject(input);
    var stringifiedOutput = JSON.stringify(output);
    var expected = JSON.stringify({
      'some': 'like',
      'first': 'second',
      'mike': 'ike',
      'Falco': 'Fox',
      'melee': 'brawl'
    });
    expect(stringifiedOutput).toEqual(expected);
  })
});

describe('listAllValues', function() {
  var input;
  beforeEach(function() {
    input = {
      name : 'Krysten',
      age : 33,
      hasPets : false,
      nose: 'yes',
      ears: 'something'
    };
  });
  it('should return an array', function() {
    var output = listAllValues(input);
    expect(Array.isArray(output)).toBe(true);
  });
  it('should format the array properly', function() {
    var output = listAllValues(input);
    expect(output[0]).toBe('Krysten');
    expect(output[1]).toBe(33);
    expect(output[2]).toBe(false);
    expect(output[3]).toBe('yes');
    expect(output[4]).toBe('something');
  });
});

describe('transformEmployeeData', function() {
  var input;

  beforeEach(function() {
    input = [
      [
        ['firstName', 'Joe'], ['lastName', 'Blow'], ['age', 42], ['role', 'clerk']
      ],
      [
        ['firstName', 'Mary'], ['lastName', 'Jenkins'], ['age', 36], ['role', 'manager']
      ],
      [
        ['firstName', 'Extra'], ['lastName', 'Spicy'], ['age', 234], ['role', 'hard code spoiler']
      ]
    ];
  })
  it('should return an Array containing objects', function() {
    var output = transformEmployeeData(input);
    expect(typeof output[0]).toBe("object");
    expect(Array.isArray(output)).toBe(true);
  });
  it('should transform the employee data', function() {
    var output = transformEmployeeData(input);
    var expected = [
      {firstName: 'Joe', lastName: 'Blow', age: 42, role: 'clerk'},
      {firstName: 'Mary', lastName: 'Jenkins', age: 36, role: 'manager'},
      {firstName: 'Extra', lastName: 'Spicy', age: 234, role: 'hard code spoiler'}
    ];
    expect(JSON.stringify(expected)).toBe(JSON.stringify(output));
  });
});

describe('convertObjectToList', function() {
  var input;
  beforeEach(function() {
    input = {
      name: 'Holly',
      age: 35,
      role: 'producer',
      extra: 'Uh Oh'
    }
  });
  it('should return an array', function() {
    var output = convertObjectToList(input);
    expect(Array.isArray(output)).toBe(true);
  });
  it('should convert the input object to an array', function() {
    var output = convertObjectToList(input);
    var expected = [['name', 'Holly'], ['age', 35], ['role', 'producer'], ['extra', 'Uh Oh']];
    expect(JSON.stringify(output)).toBe(JSON.stringify(expected));
  })
})

describe('greetCustomer', function() {
  it('handles 1st time visitor from sample data', function() {
    var output = greetCustomer('Voldemort');
    var expected = 'Welcome! Is this your first time?';
    expect(output).toEqual(expected);
  });

  it('handles 2nd time visitor from sample data', function() {
    var output = greetCustomer('Joe');
    var expected = "Welcome back, Joe! We're glad you liked us the first time!";
    expect(output).toEqual(expected);
  });

  it('handles 2nd time visitor from new nonsample data', function() {
    var oldCustomerDataJSON = JSON.stringify(customerData);

    customerData['Ben'] = {
      visits: 1
    };

    var output = greetCustomer('Ben');
    var expected = "Welcome back, Ben! We're glad you liked us the first time!";
    expect(output).toEqual(expected);

    customerData = JSON.parse(oldCustomerDataJSON);
  });

  it('handles 3rd time visitor from sample data', function() {
    var output = greetCustomer('Howard');
    var expected = 'Welcome back, Howard! So glad to see you again!';
    expect(output).toEqual(expected);
  });

  it('handles 4th time visitor from new nonsample data', function() {
    var oldCustomerDataJSON = JSON.stringify(customerData);

    customerData['Macklemore'] = {
      visits: 3
    };

    var output = greetCustomer('Macklemore');
    var expected = 'Welcome back, Macklemore! So glad to see you again!';
    expect(output).toEqual(expected);

    customerData = JSON.parse(oldCustomerDataJSON);
  });

});
