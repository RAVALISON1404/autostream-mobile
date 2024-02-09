import { QRCode } from 'qrcode.react';
const QrCodeComponent: React.FC = () => {
    return (

        <QRCodeCanvas
            value={"https://picturesofpeoplescanningqrcodes.tumblr.com/"}
            size={128}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"H"}
            includeMargin={false}
            imageSettings={{
                src: "https://static.zpao.com/favicon.png",
                x: undefined,
                y: undefined,
                height: 24,
                width: 24,
                excavate: true,
            }}
        />
    )
}