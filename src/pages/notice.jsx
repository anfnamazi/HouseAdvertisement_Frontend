import React, { Fragment, useEffect, useState } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Link, Redirect, withRouter } from "react-router-dom";
import {
  getNotice,
  deleteNotice,
  updateNotice,
} from "../services/noticeService";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import { isValidToken } from "../utils/comparison";
import LocationPicker from "react-leaflet-location-picker";

const Notice = ({ match, history }) => {
  const [noticeInfo, setnoticeInfo] = useState({
    latitude: 35.6892,
    longitude: 51.389,
    address: "",
    phone: "",
    date: new Date(),
  });
  const [modal, setModal] = useState(false);
  const [pointVals, setpointVals] = useState([[35.6892, 51.389]]);

  const customMarker = new L.icon({
    iconUrl: require("../assets/images/marker-icon.png"),
    iconSize: [27, 37],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28],
  });

  const initilize = async (id) => {
    const response = await getNotice(id);
    if (response.status === 200) {
      setnoticeInfo({ ...response.data });
      setpointVals([[response.data.latitude, response.data.longitude]]);
    }
  };

  const handleRemoveNotice = async () => {
    if (match.params.id && window.confirm("آیا از حذف این آگهی مطئمن هستید؟")) {
      const result = await deleteNotice(match.params.id);
      if (result.status === 200) {
        history.replace("/");
        toast.success("آگهی با موفقیت حذف شد");
      }
    }
  };

  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point) => setpointVals([point]),
    },
  };

  const toggleModal = () => setModal(!modal);

  const handleEditNotice = async (event) => {
    event.preventDefault();
    if (match.params.id) {
      const phone = event.target.phone.value;
      const address = event.target.address.value;
      const latitude = pointVals[0][0];
      const longitude = pointVals[0][1];
      const newNotice = { latitude, longitude, address, phone };
      const result = await updateNotice(match.params.id, newNotice);

      if (result.status === 200) {
        initilize(match.params.id);
        toast.success("آگهی با موفقیت بروز رسانی شد");
        toggleModal();
      }
    }
  };

  useEffect(() => {
    if (match.params.id) {
      initilize(match.params.id);
    }
  }, []);

  if (!isValidToken()) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>آگهی جدید</ModalHeader>
        <form onSubmit={handleEditNotice}>
          <ModalBody>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label for="exampleFormControlInput1">
                  <i
                    className="fa fa-phone text-primary"
                    aria-hidden="true"
                  ></i>
                  <span className="pr-1 text-primary text-primary">
                    {" "}
                    شماره تماس
                  </span>
                </label>
                <input
                  type="tel"
                  className="form-control"
                  style={{ direction: "ltr" }}
                  minLength={11}
                  maxLength={11}
                  name="phone"
                  placeholder="09*****"
                  required={true}
                  defaultValue={noticeInfo.phone}
                />
              </div>
              <div className=" form-group col-md-6">
                <label for="exampleFormControlSelect1">
                  <i
                    className="fa fa-location-arrow text-primary"
                    aria-hidden="true"
                  ></i>
                  <span className="pr-1 text-primary">آدرس</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="---"
                  required={true}
                  defaultValue={noticeInfo.address}
                />
              </div>
            </div>
            <div className="row">
              <h2 className="txt-header"> انتخاب لوکیشن</h2>
              <div className="col-12" id="map">
                <LocationPicker pointMode={pointMode} startPort="auto" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              ذخیره
            </Button>{" "}
            <Button color="danger" onClick={toggleModal}>
              بستن
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      <div className="container mt-3">
        <div className="d-flex justify-content-center mb-3">
          <Link to="/">
            <Button color="danger">بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-description boxShadow p-3">
              <div className="d-flex pb-3 description-text align-items-baseline">
                <h3 className="txt-header">شماره تماس: </h3>
                <h5 className="mx-3">{noticeInfo.phone}</h5>
                <div className="mr-auto px-4">
                  <Button
                    title="حذف آگهی"
                    close
                    style={{ opacity: 1, outline: "none" }}
                    onClick={handleRemoveNotice}
                  >
                    <span aria-hidden>
                      <b className="fa fa-trash text-danger" />
                    </span>
                  </Button>
                  <Button
                    title="اصلاح آگهی"
                    close
                    style={{ opacity: 1, outline: "none" }}
                    className="mx-5"
                    onClick={toggleModal}
                  >
                    <span aria-hidden>
                      <b className="fa fa-edit text-info" />
                    </span>
                  </Button>
                </div>
              </div>
              <div className="box-description-addres mt-3 mb-3">
                <div>
                  <span className="box-description-inner-title pl-2">
                    آدرس:
                  </span>{" "}
                  <span>{noticeInfo.address}</span>
                </div>
                <div>
                  <div className="box-description-inner ">
                    <p>
                      <span className="box-description-inner-title pl-2">
                        {" "}
                        تاریخ ثبت آگهی:
                      </span>
                      <span>
                        {new Date(noticeInfo.date).toLocaleString("fa-IR")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3 mb-3">
        <h3 className="txt-header">نقشه</h3>
        <div className="row">
          <div className="col-md-12">
            <div id="map">
              <Map
                style={{ height: 350 }}
                center={[noticeInfo.latitude, noticeInfo.longitude]}
                zoom={12}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  position={[noticeInfo.latitude, noticeInfo.longitude]}
                  icon={customMarker}
                >
                  <Popup>خانه انیجاست!</Popup>
                </Marker>
              </Map>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Notice);
