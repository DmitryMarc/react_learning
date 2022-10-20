import profileReducer, { addPostActionCreator, 
  deletePostActionCreator } from "./profile-reducer";

let state = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'It\'s my first post', likesCount: 20 },
        { id: 3, message: 'It\'s my second post', likesCount: 21 },
        { id: 4, message: 'It\'s my coolest post', likesCount: 4 }
    ]
}
//1
test('message of new post should be correct', () => {
    //1. test data
    let action = addPostActionCreator("it-kamasutra.com");
    //2. action (создаём экшн)
    let newState = profileReducer(state, action); 
    //3. expectation (ожидания, ожидаемый результат)
    expect(newState.postsData.length).toBe(5);
  });
//2
  test('length of posts should be incremented', () => {
    //1. test data
    let action = addPostActionCreator("it-kamasutra.com");
    //2. action (создаём экшн)
    let newState = profileReducer(state, action); 
    //3. expectation (ожидания, ожидаемый результат)
    expect(newState.postsData[4].message).toBe("it-kamasutra.com");
  });
//3
  test('after deleting length of message should be decrement', () => {
    //1. test data
    let action = deletePostActionCreator(1);
    //2. action (создаём экшн)
    let newState = profileReducer(state, action); 
    //3. expectation (ожидания, ожидаемый результат)
    expect(newState.postsData.length).toBe(3);
  });
//4
  test(`after deleting length of message shouldn't 
  be decrement if id is incorrect`, () => {
    //1. test data
    let action = deletePostActionCreator(1000);
    //2. action (создаём экшн)
    let newState = profileReducer(state, action); 
    //3. expectation (ожидания, ожидаемый результат)
    expect(newState.postsData.length).toBe(4);
  });