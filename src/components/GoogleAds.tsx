import Script from "next/script";

/** Google Ads global site tag. Loads only when NEXT_PUBLIC_GOOGLE_ADS_ID (AW-XXXXXXXXX) is set. */
export default function GoogleAds() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (!id) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-ads" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}
