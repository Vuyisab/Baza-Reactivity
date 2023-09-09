import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoWidgetDropZone from "./PhotoWidgetDropZone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface Props {
  uploadPhoto: (file: Blob) => void;
  loading: boolean;
}

const PhotoUploadWidget = ({ loading, uploadPhoto }: Props) => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setcropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 1 - Add Photo" />
        <PhotoWidgetDropZone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2 - Resize image" />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setcropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={5}>
        <Header sub color="teal" content="Step 3 - Add Preview & Upload" />
        {files && files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button.Group widths={2} style={{ marginTop: 20 }}>
              <Button
                loading={loading}
                onClick={onCrop}
                positive
                icon="check"
              />
              <Button
                disabled={loading}
                onClick={() => setFiles([])}
                icon="close"
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
