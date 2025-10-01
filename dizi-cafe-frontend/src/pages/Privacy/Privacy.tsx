const Privacy = () => {
  const styles: React.CSSProperties = {
    padding: "40px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    color: "#2c1717ff",
  };

  return (
    <div style={styles}>
      <h1>Gizlilik Politikası</h1>
      <p>
        DiziCafe olarak kullanıcı bilgilerinin güvenliğini önemsiyoruz. Bu sayfa,
        hangi bilgileri topladığımızı ve nasıl kullandığımızı açıklamaktadır.
      </p>

      <h3>Toplanan Bilgiler</h3>
      <ul>
        <li>Kayıt sırasında ad, e-posta ve şifre.</li>
        <li>İzleme listeleri, yorumlar ve beğeniler gibi aktiviteler.</li>
        <li>IP adresi ve çerezler aracılığıyla teknik bilgiler.</li>
      </ul>

      <h3>Bilgilerin Kullanımı</h3>
      <ul>
        <li>Hizmetleri sunmak ve geliştirmek.</li>
        <li>Kullanıcı deneyimini kişiselleştirmek.</li>
        <li>Yasal yükümlülükleri yerine getirmek.</li>
      </ul>

      <p>
        Çerezler, kullanıcı deneyimini geliştirmek ve tercihlerinizi hatırlamak için
        kullanılmaktadır. Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz.
      </p>

      <p>
        Sorularınız için{" "}
        <a href="mailto:destek@dizicafe.com">destek@dizicafe.com</a> adresinden bize ulaşabilirsiniz.
      </p>
    </div>
  );
};

export default Privacy;
