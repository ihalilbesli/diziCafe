const Faq = () => {
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
    question: {
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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sıkça Sorulan Sorular (SSS)</h1>

      <h3 style={styles.question}>Nasıl kayıt olabilirim?</h3>
      <p style={styles.paragraph}>
        Kayıt Ol sayfasından ad, e-posta, kullanıcı adı ve şifre belirleyerek kolayca
        üyelik oluşturabilirsiniz. Kayıt işlemi sonrasında giriş yaparak tüm
        özelliklerden yararlanabilirsiniz.
      </p>

      <h3 style={styles.question}>Kaydedilen filmlerim nerede bulunur?</h3>
      <p style={styles.paragraph}>
        Beğendiğiniz veya daha sonra izlemek istediğiniz filmleri "Kaydet" butonuna
        basarak listenize ekleyebilirsiniz. Bu filmler profil menüsünde yer alan
        <b> Kaydedilenler</b> bölümünde görüntülenir.
      </p>

      <h3 style={styles.question}>Beğendiğim veya beğenmediğim filmleri nasıl görebilirim?</h3>
      <p style={styles.paragraph}>
        Her film kartında bulunan beğenme / beğenmeme butonları ile tepki verebilirsiniz.
        Daha sonra profil menünüzde yer alan <b>Beğenilerim</b> sayfasından bunlara
        ulaşabilirsiniz.
      </p>

      <h3 style={styles.question}>Yorumlarımı nasıl yönetebilirim?</h3>
      <p style={styles.paragraph}>
        Filmlere yaptığınız yorumlar ilgili film sayfasında görüntülenir. Ayrıca
        "Yorumlarım" sayfasında geçmişte yaptığınız tüm yorumları görebilir ve yönetebilirsiniz.
      </p>

      <h3 style={styles.question}>Hesap bilgilerimi güncelleyebilir miyim?</h3>
      <p style={styles.paragraph}>
        Profil menüsünde bulunan <b>Ayarlar</b> sayfasından ad, e-posta, kullanıcı adı
        ve şifrenizi güncelleyebilirsiniz. E-posta ve kullanıcı adı benzersiz olmalıdır.
      </p>
    </div>
  );
};

export default Faq;
