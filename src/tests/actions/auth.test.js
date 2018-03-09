import {login, logout} from "../../actions/auth";

test('should return login object given user uid', ()=>{
    expect(login('A1234')).toEqual({
        type: 'LOGIN',
        uid: "A1234"
    })
});

test('should return logout object', ()=>{
    expect(logout()).toEqual({
        type: 'LOGOUT'
    })
});