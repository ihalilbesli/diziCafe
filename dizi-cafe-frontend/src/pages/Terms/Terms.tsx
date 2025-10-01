const Terms = () => {
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
    paragraph: {
      marginBottom: "20px",
      fontSize: "18px",
      color: "#ddd",
      textAlign: "center",
    },
    list: {
      paddingLeft: "30px",
      marginBottom: "30px",
    },
    listItem: {
      marginBottom: "14px",
      fontSize: "17px",
      color: "#ccc",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Kullanım Şartları</h1>
      <p style={styles.paragraph}>
        DiziCafe, kullanıcıların film ve dizi hakkında bilgi alabileceği, yorum yapabileceği
        ve kişisel listeler oluşturabileceği bir platformdur. Platformu kullanmaya başlayan
        her kullanıcı, aşağıdaki şartları kabul etmiş sayılır.
      </p>

      <ul style={styles.list}>
        <li style={styles.listItem}>
          Kullanıcı, yaptığı tüm yorumlardan ve paylaşımlardan yalnızca kendisi sorumludur.
        </li>
        <li style={styles.listItem}>
          Küfür, hakaret, nefret söylemi, tehdit veya spam içerikler kesinlikle yasaktır.
        </li>
        <li style={styles.listItem}>
          Kullanıcı, birden fazla hesap açamaz. Tespit edilmesi durumunda tüm hesaplar
          kapatılabilir.
        </li>
        <li style={styles.listItem}>
          Kullanıcılar yalnızca kendi profillerini güncelleyebilir, başka hesaplara müdahale
          edemez.
        </li>
        <li style={styles.listItem}>
          Platform üzerinde paylaşılan içerikler DiziCafe moderatörleri tarafından
          gerektiğinde silinebilir veya düzenlenebilir.
        </li>
      </ul>

      <p style={styles.paragraph}>
        DiziCafe’yi kullanmaya devam eden her kullanıcı, bu şartlara uymayı taahhüt eder.
      </p>
    </div>
  );
};

export default Terms;
