import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import SubscriberPageLayout from "../../../layouts/SubscriberPageLayout";
import {
  CreatePhotoLibraryProps,
  createPhotoLibrary,
  getPhotoLibrary,
} from "../../../services/API";
import style from "./SubscriberPhotoLibrary.module.scss";
import CardLayout from "../../../components/CardLayout/CardLayout";
import { PhotoLibraryProps } from "../../../services/DataProvider";

import SubscriberPhotoLibraryCard from "./SubscriberPhotoLibraryCard";

const SubscriberPhotoLibrary = () => {
  /****************************************/
  /******* Create photo library ***********/
  /****************************************/

  const [imageUrl, setImageUrl] = useState<string>("");

  const onSubmitCreatePhotoLibrary = async () => {
    try {
      const payload: CreatePhotoLibraryProps = {
        imageurl: imageUrl,
      };
      const res = await createPhotoLibrary(payload);

      if (res) {
        toast.success("Photo created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        loadPhotoLibraryPhotos();
        setImageUrl("");
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /********* Load  Photo Library **********/
  /****************************************/

  const [photoLibraryPhotos, setPhotoLibraryPhotos] = useState<
    PhotoLibraryProps[]
  >([]);

  const loadPhotoLibraryPhotos = async () => {
    try {
      const res = await getPhotoLibrary();

      if (res) {
        setPhotoLibraryPhotos(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    loadPhotoLibraryPhotos();
  }, []);

  return (
    <SubscriberPageLayout>
      <CardLayout>
        <div className={style.uploadPhotoContainer}>
          <div className="form-group">
            <input
              type="text"
              name="Name"
              className={style.inputPhotoULR}
              placeholder="Image url *"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success"
            onClick={onSubmitCreatePhotoLibrary}
          >
            Save
          </button>
        </div>
      </CardLayout>

      {/* // To show the photos */}

      <div className="row">
        {photoLibraryPhotos &&
          photoLibraryPhotos.map((item) => (
            <div className="col-xl-3 col-lg-3">
              <CardLayout>
                <SubscriberPhotoLibraryCard photo={item} key={item._id} />
              </CardLayout>
            </div>
          ))}
      </div>
    </SubscriberPageLayout>
  );
};

export default SubscriberPhotoLibrary;
