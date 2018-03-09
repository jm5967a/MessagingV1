import Auth from "../../reducers/auth";

test('should set user uid on login', ()=>{
   expect(Auth({},{type: 'LOGIN', uid: 'A12345'})) .toEqual({uid:'A12345'})
});

test('should clear user uid on logout', ()=>{
    expect(Auth({uid: "test"},{type: 'LOGOUT'})) .toEqual({})
});