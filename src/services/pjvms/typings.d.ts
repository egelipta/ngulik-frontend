declare namespace API {
  type AccessToken = {
    /** Token */
    token?: string;
    /** Expires In */
    expires_in?: number;
  };

  type AccountLogin = {
    /** Username username */
    username?: string;
    /** Password password */
    password?: string;
    /** Mobile phone number */
    mobile?: string;
    /** Captcha 6-digit verification code */
    captcha?: string;
  };

  type allRolesOptionsApiV1AdminRoleAllGetParams = {
    user_id?: number;
  };

  type BaseResp = {
    /** Code status code */
    code: number;
    /** Message message */
    message: string;
    /** Data data */
    data: any[];
  };

  type BodyAvatarUploadApiV1AdminUserAvatarUploadPut = {
    /** Avatar */
    avatar: string;
  };

  type CreateAccess = {
    /** Access Name Permission name */
    access_name?: string;
    /** Scopes Permissions */
    scopes?: string;
    /** Parent Id */
    parent_id?: number;
    /** Is Check */
    is_check?: boolean;
    /** Is Menu */
    is_menu?: boolean;
  };

  type CreateRole = {
    /** Role Name */
    role_name: string;
    /** Role Status */
    role_status?: boolean;
    /** Role Desc */
    role_desc?: string;
  };

  type CreateTugas = {
    /** Name */
    name: string;
    /** Start */
    start: string;
    /** End */
    end: string;
    /** Progress */
    progress: number;
    /** Tipe */
    tipe: string;
    /** Project */
    project?: string;
    /** Dependencies */
    dependencies?: string;
  };

  type CreateUser = {
    /** Username */
    username: string;
    /** Password */
    password: string;
    /** User Phone */
    user_phone?: string;
    /** User Status */
    user_status?: boolean;
    /** Remarks */
    remarks?: string;
    /** Roles */
    roles?: number[];
    /** Nickname */
    nickname: string;
    /** User Type */
    user_type?: boolean;
  };

  type CurrentUser = {
    /** Code status code */
    code: number;
    /** Message message */
    message: string;
    data: UserInfo;
  };

  type dataSubprojectApiV1TugasTugasDataSubprojectGetParams = {
    id: any;
  };

  type deleteRoleApiV1AdminRoleDeleteParams = {
    role_id: number;
  };

  type downloadImageApiV1AdminUserPhotoUploadTesPostParams = {
    url: any;
  };

  type getAllAccessApiV1AdminAccessGetParams = {
    role_id: number;
  };

  type getAllRoleApiV1AdminRoleGetParams = {
    pageSize?: number;
    current?: number;
    role_name?: string;
    role_status?: boolean;
    create_time?: string[];
  };

  type hapusDataApiV1TugasTugasHapusDataDeleteParams = {
    id: number;
  };

  type HTTPValidationError = {
    /** Detail */
    detail?: ValidationError[];
  };

  type ModifyMobile = {
    /** Mobile phone number */
    mobile: string;
    /** Captcha 6-digit verification code */
    captcha: string;
  };

  type RoleItem = {
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Role Name */
    role_name: string;
    /** Role Status */
    role_status?: boolean;
    /** Role Desc */
    role_desc?: string;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type RoleList = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: RoleItem[];
    /** Total total */
    total: number;
  };

  type SetAccess = {
    /** Role Id */
    role_id: number;
    /** Access Permissions */
    access?: number[];
  };

  type SetRole = {
    /** User Id */
    user_id: number;
    /** Roles Role */
    roles?: number[];
  };

  type TugasItem = {
    /** Name */
    name: string;
    /** Start */
    start: string;
    /** End */
    end: string;
    /** Progress */
    progress: number;
    /** Tipe */
    tipe: string;
    /** Project */
    project?: string;
    /** Dependencies */
    dependencies?: string;
    /** Id */
    id: number;
    /** Key */
    key: number;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type tugasListApiV1TugasTugasGetParams = {
    pageSize?: number;
    current?: number;
    name?: string;
    start?: string;
    end?: string;
    progress?: string;
    tipe?: string;
    project?: string;
    dependencies?: string;
    create_time?: string;
    update_time?: string;
  };

  type TugasListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: TugasItem[];
    /** Total total */
    total: number;
  };

  type UpdateRole = {
    /** Id */
    id: number;
    /** Role Name */
    role_name: string;
    /** Role Status */
    role_status?: boolean;
    /** Role Desc */
    role_desc?: string;
  };

  type UpdateTugas = {
    /** Name */
    name: string;
    /** Start */
    start: string;
    /** End */
    end: string;
    /** Progress */
    progress: number;
    /** Tipe */
    tipe: string;
    /** Project */
    project?: string;
    /** Dependencies */
    dependencies?: string;
    /** Id */
    id: number;
  };

  type UpdateUser = {
    /** Id */
    id: number;
    /** Username */
    username?: string;
    /** Password */
    password?: string;
    /** User Phone */
    user_phone?: string;
    /** User Status */
    user_status?: boolean;
    /** Remarks */
    remarks?: string;
  };

  type UpdateUserInfo = {
    /** Nickname */
    nickname?: string;
    /** User Email */
    user_email?: string;
    /** Header Img */
    header_img?: string;
    /** User Phone phone number */
    user_phone?: string;
    /** Password password */
    password?: string;
  };

  type userDelApiV1AdminUserDeleteParams = {
    user_id: number;
  };

  type UserInfo = {
    /** Username */
    username: string;
    /** Age */
    age?: number;
    /** User Type */
    user_type: boolean;
    /** Nickname */
    nickname?: string;
    /** User Phone */
    user_phone?: string;
    /** User Email */
    user_email?: string;
    /** Full Name */
    full_name?: string;
    /** Scopes */
    scopes?: string[];
    /** User Status */
    user_status: boolean;
    /** Header Img */
    header_img?: string;
    /** Sex */
    sex: number;
  };

  type userListApiV1AdminUserGetParams = {
    pageSize?: number;
    current?: number;
    username?: string;
    user_phone?: string;
    user_status?: boolean;
    create_time?: string[];
  };

  type UserListData = {
    /** Success status code */
    success: boolean;
    /** Data */
    data: UserListItem[];
    /** Total total */
    total: number;
  };

  type UserListItem = {
    /** Key */
    key: number;
    /** Id */
    id: number;
    /** Username */
    username: string;
    /** Age */
    age?: number;
    /** User Type */
    user_type: boolean;
    /** Nickname */
    nickname?: string;
    /** User Phone */
    user_phone?: string;
    /** User Email */
    user_email?: string;
    /** Full Name */
    full_name?: string;
    /** User Status */
    user_status: boolean;
    /** Header Img */
    header_img?: string;
    /** Sex */
    sex: number;
    /** Remarks */
    remarks?: string;
    /** Create Time */
    create_time: string;
    /** Update Time */
    update_time: string;
  };

  type UserLogin = {
    /** Code status code */
    code: number;
    /** Message message */
    message: string;
    data: AccessToken;
  };

  type ValidationError = {
    /** Location */
    loc: (string | number)[];
    /** Message */
    msg: string;
    /** Error Type */
    type: string;
  };
}
