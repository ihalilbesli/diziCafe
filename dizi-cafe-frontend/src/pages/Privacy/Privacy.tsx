const Privacy = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: "60px 50px",
      maxWidth: "1000px",
      margin: "40px auto",
      fontFamily: "Segoe UI, Arial, sans-serif",
      lineHeight: "2",
      color: "#f1f1f1",
      backgroundColor: "#1c1c1c",
      borderRadius: "12px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.7)",
    },
    heading: {
      fontSize: "36px",
      marginBottom: "30px",
      color: "#ffcc00",
      textAlign: "center",
      fontWeight: "bold",
    },
    subHeading: {
      fontSize: "22px",
      marginTop: "25px",
      marginBottom: "12px",
      color: "#ffcc00",
      fontWeight: "bold",
    },
    paragraph: {
      marginBottom: "20px",
      fontSize: "18px",
      color: "#ddd",
    },
    list: {
      paddingLeft: "30px",
      marginBottom: "30px",
      fontSize: "17px",
      color: "#ccc",
    },
    link: {
      color: "#ffcc00",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Gizlilik Politikası</h1>
      <p style={styles.paragraph}>
        DiziCafe olarak kullanıcıların kişisel verilerini korumayı taahhüt ediyoruz.
        Kayıt ve kullanım süresince sağlanan bilgiler yalnızca sistemin işleyişi ve
        kullanıcı deneyiminin iyileştirilmesi için kullanılmaktadır.
      </p>

      <h3 style={styles.subHeading}>Toplanan Bilgiler</h3>
      <ul style={styles.list}>
        <li>Ad, soyad, e-posta ve kullanıcı adı.</li>
        <li>Kayıt sırasında belirlenen şifre (güvenlik için şifrelenmiş şekilde saklanır).</li>
        <li>Yorumlar, beğeniler ve kaydedilen filmler.</li>
        <li>Oturum bilgileri (güvenlik amaçlı).</li>
      </ul>

      <h3 style={styles.subHeading}>Bilgilerin Kullanımı</h3>
      <ul style={styles.list}>
        <li>Kullanıcı hesaplarının yönetimi ve güvenliği.</li>
        <li>Platformun işleyişini geliştirmek.</li>
        <li>Kullanıcıların kayıtlı listelerine ve yorum geçmişine erişim sağlamak.</li>
      </ul>

      <p style={styles.paragraph}>
        Kullanıcı bilgileri üçüncü kişilerle paylaşılmaz. Yalnızca yasal zorunluluk
        durumunda ilgili mercilerle paylaşılabilir.
      </p>

      <p style={styles.paragraph}>
        Sorularınız için{" "}
        <a style={styles.link} href="mailto:destek@dizicafe.com">
          destek@dizicafe.com
        </a>{" "}
        adresinden bize ulaşabilirsiniz.
      </p>
    </div>
  );
};

export default Privacy;
