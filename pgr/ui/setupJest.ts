import 'jest-preset-angular';

(global as any).createSpyObj = (name: string, functions: string[] | object) => {
  let mockedFunctions: any = {};
  let type = typeof functions;
  if(!Array.isArray(functions)){
      for(let fnValue of Object.entries(functions)){
          mockedFunctions[fnValue[0]] = jest.fn().mockReturnValue(fnValue[1]);
      }
  }
  else{
      for(let fn of functions){
          mockedFunctions[fn] = jest.fn();
      }
  }

  return mockedFunctions;
};
