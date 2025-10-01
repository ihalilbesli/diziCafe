const Terms = () => {
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
      <h1>Kullanım Şartları</h1>
      <p>
        DiziCafe platformunu kullanarak aşağıdaki kuralları kabul etmiş sayılırsınız.
        Bu şartlara uymayan kullanıcıların hesapları kısıtlanabilir veya sonlandırılabilir.
      </p>

      <ul>
        <li>Tüm yorum ve içeriklerden kullanıcı sorumludur.</li>
        <li>Telif hakkı bulunan dizi/film içeriklerini izinsiz paylaşmak yasaktır.</li>
        <li>Hakaret, küfür, tehdit veya nefret söylemi içeren yorumlara izin verilmez.</li>
        <li>Reklam, spam veya ticari amaçlı içerik paylaşımı yasaktır.</li>
        <li>Kullanıcılar sadece bir hesap açabilir. Çoklu hesaplar tespit edilirse kapatılır.</li>
      </ul>

      <p>
        DiziCafe yöneticileri gerektiğinde içerikleri düzenleme veya silme hakkına sahiptir.
        Platformu kullanan herkes bu şartları kabul etmiş sayılır.
      </p>
    </div>
  );
};

export default Terms;
