import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import LocationPicker from "react-leaflet-location-picker";
import { isValidToken } from "../utils/comparison";
import { createNewNotice, getNotices } from "../services/noticeService";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MainApp = () => {
  const [modal, setModal] = useState(false);
  const [pointVals, setpointVals] = useState([[35.6892, 51.389]]);
  const [notices, setnotices] = useState([]);

  const pointMode = {
    banner: false,
    control: {
      values: pointVals,
      onClick: (point) => setpointVals([point]),
    },
  };

  const toggleModal = () => setModal(!modal);

  const handleCreateNotice = async (event) => {
    event.preventDefault();
    const phone = event.target.phone.value;
    const address = event.target.address.value;
    const latitude = pointVals[0][0];
    const longitude = pointVals[0][1];
    const newNotice = { latitude, longitude, address, phone };
    const response = await createNewNotice(newNotice);

    if (response.status === 201) {
      toast.success("آگهی با موفقیت ثبت شد");
      toggleModal();
    }
  };

  const initializeNotice = async () => {
    const response = await getNotices();

    if (response.status === 200) {
      setnotices([...response.data]);
    }
  };

  useEffect(() => {
    initializeNotice();
  }, [modal]);

  if (!isValidToken()) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>آگهی جدید</ModalHeader>
        <form onSubmit={handleCreateNotice}>
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
      <header>
        <nav className="navbar  navbar-expand navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link pr-3" to="/logout">
                  خروج
                </Link>
              </li>
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand">
            <button
              type="button"
              className="btn-Advertising btn btn-primary"
              onClick={toggleModal}
            >
              <span id="Advertising-text"> ثبت آگهی جدید</span>
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </a>
        </nav>
      </header>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12 bg-image ">
            <div className="header-search-box">
              <div className="header-search-box-title">
                <h1 className="txt-header">خریدوفروش /رهن واجاره</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <h2 className="txt-header"> آگهی خریدوفروش خانه وآپارتمان</h2>
        <div className="row">
          {notices.map((notice) => (
            <div className="col-md-4 pt-3">
              <a className="txt-direction bg-light">
                <div className="box-post">
                  <div className="location">
                    <i className="fas fa-location-arrow"></i>
                    <Link to={`notice/${notice._id}`}>
                      <span>{notice.address}</span>
                    </Link>
                    <div className="price-Price">
                      <i className="far fa-phone"></i>
                      شماره تماس :<span>{notice.phone}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      <footer className="page-footer mt-3 bg-light font-small indigo">
        <div className="container">
          <div className="row text-center d-flex justify-content-center pt-5 mb-3">
            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a className="txt-direction" href="#!">
                  درباره ما
                </a>
              </h6>
            </div>

            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a className="txt-direction" href="#!">
                  خرید
                </a>
              </h6>
            </div>

            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a className="txt-direction" href="#!">
                  اجاره
                </a>
              </h6>
            </div>
            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a className="txt-direction" href="#!">
                  ورود/ثبت نام
                </a>
              </h6>
            </div>

            <div className="col-md-2 mb-3">
              <h6 className="text-uppercase font-weight-bold">
                <a className="txt-direction" href="#!">
                  تماس باما
                </a>
              </h6>
            </div>
          </div>

          <hr className="rgba-white-light" style={{ margin: "0 15%" }} />

          <div className="row d-flex text-center justify-content-center mb-md-0 mb-4">
            <div className="col-md-8 col-12 mt-5">
              <p style={{ lineHeight: "1.7rem" }}>
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان
                جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
                برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در
                زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و
                دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد
                وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات
                پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
              </p>
            </div>
          </div>

          <hr
            className="clearfix d-md-none rgba-white-light"
            style={{ margin: "10% 15% 5%" }}
          />
          <div className="row pb-3">
            <div className="col-md-12">
              <div className="mb-5 flex-center">
                <a className="fb-ic">
                  <i className="fab fa-facebook-f fa-lg white-text mr-4"> </i>
                </a>

                <a className="tw-ic">
                  <i className="fab fa-twitter fa-lg white-text mr-4"> </i>
                </a>

                <a className="gplus-ic">
                  <i className="fab fa-google-plus-g fa-lg white-text mr-4">
                    {" "}
                  </i>
                </a>

                <a className="li-ic">
                  <i className="fab fa-linkedin-in fa-lg white-text mr-4"> </i>
                </a>

                <a className="ins-ic">
                  <i className="fab fa-instagram fa-lg white-text mr-4"> </i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default MainApp;
