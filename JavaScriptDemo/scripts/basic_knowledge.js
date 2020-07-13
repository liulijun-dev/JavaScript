var myName
function name() {
  myName = "JSDemo";
}

function printName() {
  alert(myName)
}

function UserException(message) {
  this.message = message;
  this.name="UserException";
  this.toString = function () {
    return `${this.name}: ${this.message}`;
  }
}

function getMonthName(mo) {
  mo = mo - 1; // Adjust month number for array index (1 = Jan, 12 = Dec)
  // TODO: const begins from ES6
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (months[mo]) {
    return months[mo];
  } else {
    throw "InvalidMonthNo"; //throw keyword is used here
  }
}

function finallyOverrideException() {
  try {
    throw 'bogus';
  } catch(e) {
    console.log('caught inner "bogus"');
    throw e; // this throw statement is suspended until
             // finally block has completed
  } finally {
    return false; // overwrites the previous "throw"
  }
  // "return false" is executed now
}

function imageLoader(url) {
  return new Promise(function(resolve, reject) {
    if(url) {
      resolve(url)
    } else {
      reject(url)
    }
    /*const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';
    request.onload = function() {
      if (request.status === 200) {
        resolve(request.response);
      } else {
        reject(Error('Image didn\'t load successfully; error code:'
            + request.statusText));
      }
    };
    request.onerror = function() {
      reject(Error('There was a network error.'));
    };
    request.send();*/
  });
}

function onLoad() {
  localStorage.setItem("app_name", "JSDemo")
  document.getElementById("btn_click_me").onclick = function () {
    alert("Click Me")
  }

  document.getElementById("btn_change_image").onclick = function () {
    // TODO: let begins from ES6
    let image = document.getElementById("image")
    let imageSrc = "images/one.png"
    if (image.getAttribute("src").endsWith("one.png")) {
      imageSrc = "images/two.png"
    }
    document.getElementById("image").setAttribute("src", imageSrc)
  }

  document.getElementById("btn_result").onclick = function () {
    let numberOne = document.getElementById("number_one").value;
    let numberTwo = document.getElementById("number_two").value;
    if (numberOne.trim().length<=0 || numberTwo.trim().length<=0) {
      alert("Please input number");
      return;
    }

    if (isNaN(numberOne) || isNaN(numberTwo)) {
      alert("Please input number");
      return;
    }

    try {
      alert(parseFloat(numberOne) + parseFloat(numberTwo))
    } catch (e) {
      alert("Please input valid number");
    } finally {
      alert("Good! No exception")
    }
  }

  document.getElementById("btn_throw_exception").onclick = function () {
    try {
      throw new UserException("throw exception")
    } catch (e) {
      alert(e.toString())
    }
  }

  document.getElementById("btn_get_month").onclick = function () {
    try {
      getMonthName(20)
    } catch (e) {
      alert(e)
    }
  }

  document.getElementById("btn_finally_override_exception").onclick = function () {
    try {
      finallyOverrideException();
    } catch(e) {
      // this is never reached because the throw inside
      // the catch is overwritten
      // by the return in finally
      alert('caught outer "bogus"');
    }
  }

  document.getElementById("btn_test_error").onclick = function () {
    try {
      throw new Error("hello, error")
    } catch (e) {
      alert(`${e.name} : ${e.message}`)
    }
  }

  document.getElementById("btn_test_promise").onclick = function () {
    const url = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FPromise&psig=AOvVaw1BtICsG4TGeLO_NfZeBI4B&ust=1594454742053000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNDClPecwuoCFQAAAAAdAAAAABAD"

    imageLoader("images/promises.png").then(function(response) {
      let image = document.getElementById("promise_load_image_placeholder")
      // The first runs when the promise resolves, with the request.response
      // specified within the resolve() method.
      // image.src = window.URL.createObjectURL(response);
      image.src = response;
      // The second runs when the promise
      // is rejected, and logs the Error specified with the reject() method.
    }, function(error) {
      alert(error);
    });
  }

  document.getElementById("btn_test_for_in").onclick = function () {
    let obj = {
      name:"JavaScript",
      age: 12,
      hello: function () {
        alert("Hello JavaScript");
      }
    };

    let properties = "";

    for(let property in obj) {
      alert(`propertyName: ${property}, propertyValue: ${obj[property]}`);
    }
  }

  document.getElementById("btn_test_for_of").onclick = function () {
    let arrays = [1,2,3];
    for(let ele of arrays) {
      alert(ele);
    }
  }

  document.getElementById("btn_test_arguments").onclick = function () {
    function concat(separator) {
      let result = "";
      for(let i=1; i<arguments.length; i++) {
        result = result + arguments[i] + separator;
      }
      return result.substring(0, result.length-1);
    }

    alert(concat(",", "hello", "world"))
  }

  document.getElementById("btn_test_residue_parameters").onclick = function () {
    function concat(separator, ...str) {
      let result = "";
      for (let ele of str) {
        result = result + ele + separator;
      }
      return result.substring(0, result.length-1);
    }

    alert(concat(",", "hi", "javascript"))
  }

  document.getElementById("btn_test_arrow_function").onclick = function () {
    const a = [
      "Hydrogen",
      "Helium",
      "Lithium",
      "Beryllium"
    ];

    let result = a.map(it => it.length)
    alert(result)
  }

  document.getElementById("btn_test_this_in_arrow_function").onclick = function () {
    // 这是个对象方法
    function Person() {
      this.age = 10;

      // 这里的`this`正确地指向person对象
      setTimeout(()=>this.age++, 1000);
    }

    let person = new Person();
    setTimeout(()=>alert(person.age), 1000)
    //alert(person.age)
  }
}


