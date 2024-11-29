import sessionReducer, { setSession, clearSession } from "../slices/sessionSlice";

describe("sessionSlice", () => {
  // Estado inicial
  const initialState = {
    token: null,
    userObject: null,
  };

  it("should return the initial state when passed an empty action", () => {
    expect(sessionReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should set the session when setSession is called", () => {
    const mockPayload = {
      token: "mockToken123",
      userObject: {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      },
    };

    const expectedState = {
      token: mockPayload.token,
      userObject: mockPayload.userObject,
    };

    const action = setSession(mockPayload);
    const result = sessionReducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it("should clear the session when clearSession is called", () => {
    const currentState = {
      token: "mockToken123",
      userObject: {
        id: "1",
        email: "test@example.com",
        name: "Test User",
      },
    };

    const action = clearSession();
    const result = sessionReducer(currentState, action);

    expect(result).toEqual(initialState);
  });
});
