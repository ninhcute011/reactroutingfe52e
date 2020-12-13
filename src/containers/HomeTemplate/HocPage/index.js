import React, { Component } from "react";
// import NhanVien from "./NhanVien";
import SanPham from "./SanPham";
import WithModal from "./WithModal";

const FormModal = WithModal(SanPham);

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <FormModal />
      </div>
    );
  }
}
