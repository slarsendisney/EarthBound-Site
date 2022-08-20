import Image from "next/image";

const AddToMondayButton = () => (
  <div className="w-full">
    <a href="https://auth.monday.com/oauth2/authorize?client_id=e16c2c74440538cd428dedeab1e4450e&response_type=install">
      <Image
        layout="responsive"
        alt="Add to monday.com"
        width={356}
        height={82}
        src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/Tal/4b5d9548-0598-436e-a5b6-9bc5f29ee1d9_Group12441.png"
      />
    </a>
  </div>
);

export default AddToMondayButton;
