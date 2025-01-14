
// 枚举是否删除
export enum IsDelete {
    No = 0,
    Yes = 1
}

// 用户在项目中角色表
export enum Positions {
    Leader = 0,
    Member = 1
}

// 是否开启
export enum IsOpen {
    Close = 0,
    Open = 1
}

// 历史记录对应的操作
export enum Operation {
    Create = 0,
    Delete = 1,
    Update_Close = 2,
    Update_Open = 3
}

// 申请状态
export enum ApplyStatus {
    Done_Accept = 0,
    Done_Reject = 1,
    Wating = 2,
}

// 文件的类型
export enum FileType {
    FileRule = 0,
    FileVaribale = 1,
    FileRuleSet = 2
}

// 是否为文件夹
export enum IsFolder {
    No = 0,
    Yes = 1
}

// 变量类型
export enum VariableType {
    Int = 0,
    Double = 1,
    String = 2,
    Object = 3
}