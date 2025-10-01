const Faq = () => {
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
      <h1>Sıkça Sorulan Sorular (SSS)</h1>

      <h3>Soru: Nasıl kayıt olabilirim?</h3>
      <p>
        Ana sayfada <b>Kayıt Ol</b> butonuna tıklayarak e-posta ve şifre girmeniz
        yeterlidir. Hesabınız oluşturulduktan sonra giriş yapabilirsiniz.
      </p>

      <h3>Soru: Şifremi unuttum ne yapmalıyım?</h3>
      <p>
        Giriş sayfasında <b>Şifremi Unuttum</b> seçeneğini kullanarak e-posta
        adresinize yeni şifre linki göndertebilirsiniz.
      </p>

      <h3>Soru: İzleme listesi nedir?</h3>
      <p>
        İzleme listesi, izlemek istediğiniz dizi ve filmleri kaydedebileceğiniz
        kişisel listenizdir.
      </p>

      <h3>Soru: Yorumlarımı silebilir miyim?</h3>
      <p>
        Yorumlarınızı 10 dakika içinde düzenleyebilir veya silebilirsiniz. Sonrasında
        destek ekibiyle iletişime geçmeniz gerekir.
      </p>

      <h3>Soru: Premium üyelik ne avantaj sağlar?</h3>
      <p>
        Premium üyelik reklamsız izleme, yüksek çözünürlükte yayın ve özel içeriklere
        erişim imkanı sunar.
      </p>
    </div>
  );
};

export default Faq;
