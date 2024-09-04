export const checkValidData = (email,password)=>{
    const emailValidate = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    const passwordValidate = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(password);
  0
    if(!emailValidate) return "Email is not valid"
    if(!passwordValidate) return "Password is not valid"
    return null
}