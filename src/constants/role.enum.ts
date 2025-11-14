import { Role } from "@/transport/gateway/gRPC/stubs/exposed-common";

export const enum AuthRole {
  SUDO_ADMIN = 'SUDO_ADMIN',
  ADMIN = 'ADMIN',
  ORGANIZATION_SUPER_ADMIN = 'ORGANIZATION_SUPER_ADMIN',
  ORGANIZATION_ADMIN = 'ORGANIZATION_ADMIN',
  USER = 'USER',
}

const toAuthRole = (role: Role): AuthRole => {
  switch (role) {
    case Role.SUDO_ADMIN:
      return AuthRole.SUDO_ADMIN;
    case Role.ADMIN:
      return AuthRole.ADMIN;
    case Role.ORGANIZATION_SUPER_ADMIN:
      return AuthRole.ORGANIZATION_SUPER_ADMIN;
    case Role.ORGANIZATION_ADMIN:
      return AuthRole.ORGANIZATION_ADMIN;
    case Role.USER:
      return AuthRole.USER;
    default:
      return AuthRole.USER;
  }

}

const toProtoRole = (role: AuthRole | null): Role => {
  switch (role) {
    case AuthRole.SUDO_ADMIN:
      return Role.SUDO_ADMIN;
    case AuthRole.ADMIN:
      return Role.ADMIN;
    case AuthRole.ORGANIZATION_SUPER_ADMIN:
      return Role.ORGANIZATION_SUPER_ADMIN;
    case AuthRole.ORGANIZATION_ADMIN:
      return Role.ORGANIZATION_ADMIN;
    case AuthRole.USER:
      return Role.USER;
    default:
      return Role.ROLE_UNSPECIFIED;
  }
}

export const RoleMapper = {
  toAuthRole,
  toProtoRole
};