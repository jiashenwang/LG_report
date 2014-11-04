'use strict';

// API service for user variables
angular.module('core').factory('API', [

function() {
  var _this = this;

  _this.host = 'http://test.api.learning-genie.com/'

  _this.user = {};
  // POST api/account/login
  // 用户登录
  _this.user.login = _this.host+'api/account/login';

  _this.user.register = {};

  // POST api/account/owners
  // 园长注册
  _this.user.register.owner = _this.host+'api/account/owners';

  // POST api/account/collaborators
  // 教师注册
  _this.user.register.collaborator = _this.host+'api/account/collaborators';

  // POST api/account/parents
  // 家长注册
  _this.user.register.parent = _this.host+'api/account/parents';


  _this.user.profile = {};

  // GET api/account/send_reset_password_token?email={email}
  // 把重置密码的链接发送到用户的邮箱
  _this.user.profile.sendResetPasswordUrl = _this.host+'api/account/api/account/send_reset_password_token';

  // GET api/account/verify_reset_password_token?user_id={user_id}&token={token}
  // 验证重置密码的token
  _this.user.profile.verifyResetPasswordToken = _this.host+'api/account/verify_reset_password_token';


  // PUT api/account/reset_password
  // 重置密码
  _this.user.profile.resetPassword = _this.host+'api/account/reset_password';

  // PATCH api/account/update_password
  // 修改密码
  _this.user.profile.updatePassword = _this.host+'api/account/update_password';

  // PUT api/Account/{id}
  // 修改个人信息
  _this.user.profile.update = _this.host+'api/Account';

  /*
   * Centers
  **/
  _this.center = {};

  // GET api/Centers?owner_id={owner_id}
  // 获取用户创建的学校
  _this.center.ownerId = _this.host+'api/Centers';


  /*
   * Groups
  **/
  _this.group = {};

  // GET api/Groups?center_id={center_id}
  // 获取学校的班级
  _this.group.centerId = _this.host+'api/Groups';


  // GET api/Groups/{id}
  // 获取班级信息
  _this.group.groupId = _this.host+'api/Groups/';

  // GET api/groups/stages
  // 获取班级年龄段
  _this.group.stages = _this.host+'api/groups/stages';

  // POST api/Groups
  // 创建班级
  _this.group.create = _this.host+'api/groups/';

  // GET api/Domains
  // 获取所有domains
  _this.group.domains = _this.host+'api/Domains';

  // PUT api/Groups/{id}
  // 修改班级信息
  _this.group.update = _this.host+'api/Groups/';


  // DELETE api/Groups/{id}
  // 删除班级
  _this.group.delete = _this.host+'api/Groups/';


  // POST api/groups/invitations?group_ids={group_ids}
  // 生成教师的邀请码
  _this.group.invitation = {};
  _this.group.invitation.generate = _this.host+'api/groups/invitations';

  // PUT api/groups/invitations?group_id={group_id}
  // 往班级里添加一个邀请
  _this.group.invitation.group = _this.host+'api/groups/invitations';

  // POST api/groups/send_invitations
  // 把教师的邀请码发送到用户的邮箱
  _this.group.invitation.send = _this.host+'api/groups/send_invitations';

  /*
   * Invitations
  **/
  _this.invitation = {};
  // DELETE api/invitations/groups?invitation_id={invitation_id}&group_id={group_id}
  // 从邀请码里移除班级
  _this.invitation.delete = _this.host+'api/invitations/groups';


  /*
   * Invitations
  **/
  _this.enrollment = {};

  // POST api/Enrollments
  // 创建学生
  _this.enrollment.create = _this.host+'api/Enrollments';

  // PUT api/Enrollments/{id}
  // 修改学生信息
  _this.enrollment.update = _this.host+'api/Enrollments';

  //
  // DELETE api/Enrollments/{id}
  // 删除学生
  _this.enrollment.delete = _this.host+'api/Enrollments';

  /*
   * Invitations
  **/
  _this.media = _this.host+'api/Medias';


  /**
   * Note
   */
  _this.note = {};

  // PUT api/notes/{id}/enrollments/{enrollment_ids}
  // 往note里添加学生
  // ????????!

  // GET api/Notes/{id}
  // 获取note信息
  _this.note.get = _this.host+'api/notes';

  // GET api/Notes?enrollment_id={enrollment_id}&before_time={before_time}&count={count}&note_category={note_category}
  // 获取学生的notes
  _this.note.enrollmentId = _this.host+'api/notes';

  // GET api/Notes?group_id={group_id}
  // 获取班级的notes
  _this.note.groupId = _this.host+'api/notes';

  // POST api/Notes
  // 创建note
  _this.note.create = _this.host+'api/notes';

  // PUT api/Notes/{id}
  // 修改note
  _this.note.update = _this.host+'api/notes';

  // DELETE api/Notes/{id}
  // 删除note
  _this.note.delete = _this.host+'api/notes';

  return _this;
}
]);
