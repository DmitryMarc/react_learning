import usersReducer, { InitialStateType, actionCreators, follow, unfollow } from './users-reducer';
import { usersAPI } from '../api/users-api';
import { APIResponseType, ResultCodesEnum } from '../api/api';
//"замокай" объект, который возвращается из '../api/users-api'
jest.mock('../api/users-api');

// теперь в usersAPIMock "сидит" фейковая реализация usersAPI
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

// фейковый диспатч (заглушка)
const dispatchMock = jest.fn();
// фейковый getState (заглушка)
const getStateMock = jest.fn();

const result: APIResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {}
}

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: 'Dmitry 0', followed: false,
                photos: { small: null, large: null }, status: 'status 0'
            },
            {
                id: 1, name: 'Dmitry 1', followed: false,
                photos: { small: null, large: null }, status: 'status 1'
            },
            {
                id: 2, name: 'Dmitry 2', followed: true,
                photos: { small: null, large: null }, status: 'status 2'
            },
            {
                id: 3, name: 'Dmitry 3', followed: true,
                photos: { small: null, large: null }, status: 'status 3'
            },
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null as null | boolean
        }
    };
    dispatchMock.mockClear();
    getStateMock.mockClear();
    usersAPIMock.follow.mockClear();
    usersAPIMock.unfollow.mockClear();
})

test("follow success", () => {
    const newState = usersReducer(state, actionCreators.followSuccessActionCreator(1));

    // проверяем, что followed = false
    expect(newState.users[0].followed).toBeFalsy();
    // проверяем, что followed = true
    expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
    const newState = usersReducer(state, actionCreators.unfollowSuccessActionCreator(3));

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[1].followed).toBeFalsy();
});

test("success follow thunk", async () => {
    // Перенесли внутрь теста, чтобы тест прошёл без ошибок
    // Благодаря проделанной нами выше типизации после "follow" по ctrl + space появляются подсказки новых свойств
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result));
    // стартовые данные
    // нам в thunk вернулась санка из TC follow
    const thunk = follow(1);

    // тестируемая часть системы // последный параметр экстра аргументы
    await thunk(dispatchMock, getStateMock, {});

    // наши ожидания от теста
    //toBeCalledTimes сколько раз вызвана функция
    expect(dispatchMock).toBeCalledTimes(3);
    // "toHaveBeenCalledWith(номер вызова, {})" проверяет, что какой-то определённый вызов был сделан с определённым объектом
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.toggleFollowingProgressActionCreator(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.followSuccessActionCreator(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.toggleFollowingProgressActionCreator(false, 1));
});

test("success unfollow thunk", async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result));
    // стартовые данные
    const thunk = unfollow(1);

    // тестируемая часть системы // последный параметр экстра аргументы
    await thunk(dispatchMock, getStateMock, {});

    // наши ожидания от теста
    expect(dispatchMock).toBeCalledTimes(3);

    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.toggleFollowingProgressActionCreator(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.unfollowSuccessActionCreator(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.toggleFollowingProgressActionCreator(false, 1));
});