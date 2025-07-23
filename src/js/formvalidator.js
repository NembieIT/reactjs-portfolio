// Mai Tiến Dũng B2303803

// Validator function
function Validator({form, formGroup, formMessage, rules, onSubmit}){
    var rulesSelector = {};
    function getParent(inputElement, parent){ //Hàm lấy thẻ cha 
        while(inputElement.parentElement){
            if(inputElement.parentElement.matches(parent)){
                return inputElement.parentElement;
            }else{
                inputElement = inputElement.parentElement;
            }
        }
    }

    function validInput(inputElement){ //Hàm xoá các hiển thị lỗi hiện tại
        const errorMessage = getParent(inputElement, formGroup).querySelector(formMessage);
        errorMessage.innerText = '';
        inputElement.classList.remove('error');
    }

    function validate(inputElement, rule){ //Hàm kiểm tra giá trị của từng input
        const errorMessage = getParent(inputElement, formGroup).querySelector(formMessage);
        var rules = rulesSelector[rule]; //Set rules = mảng các rule của input đó
        for(let i=0;i<rules.length;i++){ //Duyệt qua mảng các điều kiện để kiểm tra
            var error = rules[i](inputElement.value); //false nếu trả về undifined
            if(error) break; //Dừng khi phát hiện vi phạm điều kiện
        }
        if(error){ //Hiển thị text error cho input đó
            errorMessage.innerText = error;
            inputElement.classList.add('error');
        }else{
            validInput(inputElement);
        }
        return !error; //trả về true nếu không có lỗi gì
    }
    const formSelector = document.querySelector(form);
    if(formSelector){
        rules.forEach(rule =>{ //Duyệt qua từng item trong mảng rules
            if(Array.isArray(rulesSelector[rule.selector])){ //Thêm vào object rulesSelector {key : value(mảng các điều kiện)}
                rulesSelector[rule.selector].push(rule.test);
            }else{
                rulesSelector[rule.selector]=[rule.test];
            }
            const inputElement = formSelector.querySelector(rule.selector);
            inputElement.onblur = function(){ //Gọi hàm kiểm tra value khi blur khỏi input
                validate(inputElement, rule.selector);
            }
            inputElement.oninput = function(){ //Gọi hàm xoá hiển thị vi phạm điều kiện
                validInput(inputElement);
            }
        })
        
        formSelector.onsubmit = function(e){ //Handle khi submit form
            e.preventDefault(); //Dừng hành vi mặc định (dừng hành vi submit form)
            var isValid = true;
            rules.forEach(rule=>{ //Duyệt lại các rule để kiểm tra còn vi phạm điều kiện nào nữa không
                const inputElement = formSelector.querySelector(rule.selector);
                var valid = validate(inputElement, rule.selector);
                if(!valid){
                    isValid = false; // nếu có lỗi thì isValid = false
                }
            })
            if(isValid){ //Tiến hành gửi data khi không còn vi phạm điều kiện
                if(typeof onSubmit === 'function'){
                    const inputValue = formSelector.querySelectorAll('[name]'); //Lấy ra tất cả thẻ input có thuộc tính name
                    var data = {};
                    inputValue.forEach(input =>{ //Thêm từng key : value vào object data
                        data[input.name] = input.value;
                    })
                    onSubmit(data);
                    formSelector.reset();
                }
            }
        }
    }
}

// Các điều kiện để kiểm tra
Validator.isRequired = function(selector, message){ //Kiểm tra bắt buộc
    return{
        selector : selector,
        test : function(value){
            return value ? undefined : message;
        }
    }
}
Validator.minLength = function(selector, min, message){ //Kiểm tra kí tự ít nhất
    return{
        selector: selector,
        test : function(value){
            return value.length < min ? message : undefined;
        }
    }
}
Validator.isEmail = function(selector, message){ //Kiểm tra định dạng email
    return{
        selector: selector,
        test : function(value){
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Tham khảo regex trên mạng
            return regex.test(value) ? undefined : message;
        }
    }
}
Validator.isConfirmed = function(selector, getConfirmValue, message){ //Kiểm tra input value trùng khớp với input value mình muốn
    return{
        selector: selector,
        test : function(value){
            return value === getConfirmValue() ? undefined : message;
        }
    }
}

Validator.isSame = function(selector, getOldPassword, message){ //Kiểm tra trùng nhau
    return{
        selector: selector,
        test : function(value){
            return value === getOldPassword() ? message : undefined;
        }
    }
}
