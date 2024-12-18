const Role = {
    super_admin: {
        name: 'Super Admin',
        username: 'superadmin',
        modules: {
            profile: [
                'profile_access', 'profile_edit', 'profile_delete',
            ],
            dashboard: [
                'dashboard_access',
            ],
            user: [
                'user_access', 'user_create', 'user_edit', 'user_delete',
            ],
            notification: [
                'notification_access', 'notification_create', 'notification_edit', 'notification_delete',
            ],
            post: [
                'post_access', 'post_create', 'post_edit', 'post_delete',
            ],
            category: [
                'category_access', 'category_create', 'category_edit', 'category_delete',
            ],
            setting: [
                'settings_access', 'settings_create', 'settings_edit', 'settings_delete',
            ],
        },
    },
    admin: {
        name: 'Admin',
        username: 'admin',
        modules: {
            profile: [
                'profile_access', 'profile_edit', 'profile_delete',
            ],
            dashboard: [
                'dashboard_access',
            ],
            user: [
                'user_access', 'user_create', 'user_edit',
            ],
            notification: [
                'notification_access', 'notification_create', 'notification_edit',
            ],
            post: [
                'post_access', 'post_create', 'post_edit',
            ],
            category: [
                'category_access', 'category_create', 'category_edit',
            ],
            setting: [
                'settings_access', 'settings_create', 'settings_edit',
            ],
        },
    },
    user: {
        name: 'User',
        username: 'user',
        modules: {
            profile: [
                'profile_access', 'profile_edit', 'profile_delete',
            ],
            dashboard: [
                'dashboard_access',
            ],
            user: [
                'user_access',
            ],
            notification: [
                'notification_access',
            ],
            setting: [
                'settings_access',
            ],
            category: [
                'category_access',
            ],
            post: [
                'post_access',
            ],
        },
    },
};

module.exports = Role;
