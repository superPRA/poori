export type module = {
    [index: string]: (
        context: context,
        helpers: helpers
    ) =>
        | true
        | false
        | void
        | undefined
        | string
        | {
              sql: string;
              value?: any[];
              next?: (res: {
                  command: string;
                  rowCount: number;
                  oid: number | null;
                  rows: any[];
                  fields: {
                      name: string;
                      tableID: number;
                      columnID: number;
                      dataTypeID: number;
                      dataTypeSize: number;
                      dataTypeModifier: number;
                      format: string;
                  }[];
              }) => any;
              onError?: (err: any) => any;
          }
        | {
              "data-provider": {
                  [index: string]: any;
              };
          }
        | {
              error: string;
              message?: string;
          };
}[];

export type context = {
    body: {
        [index: string]: any;
    };
    user: {
        rand_id: string;
        username: string;
        email: string;
        role: string;
        password: string;
        meta: null | any;
        cr: Date;
        token: string | null;
        up: Date;
        state: number;
    };
    action: {
        [index: string]: any;
    };
    [index: string]: any;
};

export type helpers = {
    getHeaders: (name: string) => any;
    getParams: (name: string) => any;
    randomGenerator: () => string;
    tokenGenerator: () => string;
    bodyCheck: (
        { string, existing }: bodyCheckProps,
        bd: { [index: string]: any }
    ) => {
        error: string;
        message: string;
    } | void;
};
export type bodyCheckProps = {
    string?: string[];
    existing?: string[];
};
