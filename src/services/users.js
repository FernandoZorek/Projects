import { api } from "boot/axios";
import { Notify, SessionStorage } from "quasar";
import { realm } from "../components/variables.js";
import { i18n } from "boot/i18n";

const staticRealm = SessionStorage.getItem("multiTenancyRealm") || realm;
const uri = `/admin/realms/${staticRealm}/users`
const Users = {
  async query(data) {
    return api
      .get(uri, data)
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async create(data) {
    return api
      .post(uri, data)
      .then(() => {
        Notify.create({
          color: "positive",
          position: "top-right",
          message: i18n.t("saveData"),
          icon: "check",
          timeout: 2000,
        });
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorSaveData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async edit(data, id) {
    return api
      .put(`${uri}/${id}`, data)
      .then(() => {
        Notify.create({
          color: "positive",
          position: "top-right",
          message: i18n.t("saveData"),
          icon: "check",
          timeout: 2000,
        });
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorSaveData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async delete(id) {
    return api
      .delete(`${uri}/${id}`)
      .then(() => {
        Notify.create({
          color: "positive",
          position: "top-right",
          message: i18n.t("saveData"),
          icon: "check",
          timeout: 2000,
        });
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorSaveData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async resetPassword(id, data) {
    return api
      .put(`${uri}/${id}/reset-password`, data)
      .then(() => {
        Notify.create({
          color: "positive",
          position: "top-right",
          message: i18n.t("saveData"),
          icon: "check",
          timeout: 2000,
        });
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorSaveData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async listGroups(id) {
    return api
      .get(`${uri}/${id}/groups`)
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async listRoles(id) {
    return api
      .get(`${uri}/${id}/role-mappings/realm`)
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async addGroup(userId, groupId) {
    return api
      .put(`${uri}/${userId}/groups/${groupId}`)
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async removeGroup(userId, groupId) {
    return api
      .delete(`${uri}/${userId}/groups/${groupId}`)
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async addRoles(id, data) {
    return api
      .post(`${uri}/${id}/role-mappings/realm`, data)
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  },
  async removeRoles(id, data) {
    return api
      .delete(`${uri}/${id}/role-mappings/realm`, { data })
      .then((response) => {
        return response.data.data || response.data;
      })
      .catch((e) => {
        Notify.create({
          color: "negative",
          position: "top-right",
          message: i18n.t("errorLoadingData"),
          icon: "report_problem",
          timeout: 2000,
        });
      });
  }
};

export default Users;
