import React from "react";
import { useSelector } from "react-redux";
import { roundUp } from "../../helperFunctions";

function ReviewPrint({ document, user }) {
  const isMicrofinance = document?.type_id == 2;
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const currentCurrency = currencies?.find((item) => item.SYS_MINOR == document?.currency_id);
  const dangersNetInstallments = document?.dangers?.map((item) => item.net_installment);
  const dangersNetInstallment = document?.dangers?.length === 0 ? 0 : dangersNetInstallments?.reduce((a, b) => a + b);
  const dangersRelativeStamps = document?.dangers?.map((item) => item.relative_stamp);
  const dangersRelativeStamp = document?.dangers?.length === 0 ? 0 : dangersRelativeStamps?.reduce((a, b) => a + b);
  const dangersQualitiveStamps = document?.dangers?.map((item) => item.qualitive_stamp);
  const dangersQualitiveStamp = document?.dangers?.length === 0 ? 0 : dangersQualitiveStamps?.reduce((a, b) => a + b);
  const dangersSupervisionExpenses = document?.dangers?.map((item) => item.supervision_expenses);
  const dangersSupervisionExpense =
    document?.dangers?.length === 0 ? 0 : dangersSupervisionExpenses?.reduce((a, b) => a + b);
  console.log("DANGER", dangersSupervisionExpense);
  const dangersInsuranceExpenses = document?.dangers?.map((item) => item.issuance_expenses);
  const dangersInsuranceExpense =
    document?.dangers?.length === 0 ? 0 : dangersInsuranceExpenses?.reduce((a, b) => a + b);
  console.log("DANGER", dangersInsuranceExpense);
  const dangersTotalPrices = document?.dangers?.map((item) => item.price);
  const dangersTotalPrice = document?.dangers?.length === 0 ? 0 : dangersTotalPrices?.reduce((a, b) => a + b);
  const benefsPercentages = document?.benef?.map((item) => item.percentage);
  const benefsPercentagePrice = document?.benef?.length === 0 ? 0 : benefsPercentages?.reduce((a, b) => a + b);
  const heirsPercentage = 100 - benefsPercentagePrice;

  return (
    <div className="container print-content">
      <table className="no-border">
        <thead className="no-border">
          <tr className="no-border">
            <td className="no-border">
              <div className="header-space">&nbsp;</div>
            </td>
          </tr>
        </thead>
        <tbody className="no-border">
          <tr className="no-border">
            <td className="no-border">
              <div className="content">
                <div style={{ marginTop: "-40px" }} className="pdf-header d-flex space-between fields">
                  <h4>اسم المؤمن له: {document?.name}</h4>
                  <h4>رقم العضويه: {document?.membership_id}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>عنوان العميل: {Boolean(user?.company_id) ? document?.customer_address : user?.address}</h4>
                  <h4>تليفون: {document?.phone}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>المهنة: {document?.work}</h4>
                  <h4>عنوان العمل: {document?.work_address}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>تاريخ الإصدار: {new Date(document?.created_at).toLocaleDateString("ar-EG")}</h4>
                  <h4>
                    مبلغ التأمين: {document?.package?.insurance_cost} {currentCurrency?.SYS_ADESC}
                  </h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>مدة التأمين من: {new Date(document?.from_date).toLocaleDateString("ar-EG")}</h4>
                  <h4>إلى: {new Date(document?.to_date).toLocaleDateString("ar-EG")}</h4>
                </div>
                <hr />
                {document?.dangers?.length > 0 && (
                  <>
                    <h3>الاخطار الإضافية</h3>
                    <div className="d-flex flex-between">
                      <table>
                        <tr>
                          <th>م</th>
                          <th>نوع التغطية</th>
                          <th>مبلغ التأمين</th>
                          <th>قيمة القسط</th>
                        </tr>
                        {document?.dangers?.map((item, index) => {
                          return (
                            <tr>
                              <td>1</td>
                              <td>{item?.title?.ar}</td>
                              <td>
                                {item?.insurance_amount} {currentCurrency?.SYS_ADESC}
                              </td>
                              <td>{item.price}</td>
                            </tr>
                          );
                        })}
                      </table>

                      <table className="prices-table">
                        <tr>
                          <th className="price-title">صافي القسط</th>
                          <th className="num-col">
                            {(document?.package?.net_installment + dangersNetInstallment)?.toFixed(2)}
                          </th>
                        </tr>
                        <tr>
                          <th className="price-title">الدمغة النسبية</th>
                          <th className="num-col">
                            {(document?.package?.relative_stamp + dangersRelativeStamp)?.toFixed(2)}
                          </th>
                        </tr>
                        <tr>
                          <th className="price-title">الدمغة النوعية</th>
                          <th className="num-col">
                            {(document?.package?.qualitive_stamp + dangersQualitiveStamp)?.toFixed(2)}
                          </th>
                        </tr>
                        <tr>
                          <th className="price-title">مصاريف الإشراف والمراقبة</th>
                          <th className="num-col">
                            {(document?.package?.supervision_expenses + dangersSupervisionExpense)?.toFixed(2)}{" "}
                          </th>
                        </tr>

                        <tr>
                          <th className="price-title">مصاريف الاصدار</th>
                          <th className="num-col">
                            {(document?.package?.insurance_expenses + dangersInsuranceExpense)?.toFixed(2)}
                          </th>
                        </tr>

                        {document?.membership_price && (
                          <tr>
                            <th className="price-title">اصدار سهم جديد</th>
                            <th className="num-col">{document?.membership_price?.toFixed(2)}</th>
                          </tr>
                        )}

                        <tr>
                          <th className="price-title">الاجمالي</th>
                          <th className="num-col">
                            {roundUp(document?.total_price)} {currentCurrency?.SYS_ADESC}
                          </th>
                        </tr>
                      </table>
                    </div>
                  </>
                )}

                <h3>المستفيدون</h3>
                {document?.heir === 100 ? (
                  heirsPercentage && <h4>نسبة الورثة الشرعيين: {heirsPercentage}%</h4>
                ) : (
                  <div>
                    <table>
                      <tr>
                        <th>م</th>
                        <th>الاسم</th>
                        <th>الصفة</th>
                        <th>النسبة</th>
                        <th>الرقم القومي</th>
                      </tr>
                      {document?.benef?.map((item, index) => {
                        return (
                          <tr>
                            <td>1</td>
                            <td>{item?.name}</td>
                            <td>{item?.description}</td>
                            <td>{item?.percentage}%</td>
                            <td>{item?.national_id}</td>
                          </tr>
                        );
                      })}
                    </table>
                    <br />
                    <h4>نسبة الورثة الشرعيين: {heirsPercentage}%</h4>
                  </div>
                )}
                {/* <hr />
                    <div className="d-flex space-between">
                      <div></div>
                      <table className="prices-table">
                        <tr>
                          <th className="price-title">صافي القسط</th>
                          <th className="num-col">{roundUp(document?.package?.net_installment + dangersNetInstallment)}</th>
                        </tr>
                        <tr>
                          <th className="price-title">الدمغة النسبية</th>
                          <th className="num-col">{roundUp(document?.package?.relative_stamp + dangersRelativeStamp)}</th>
                        </tr>
                        <tr>
                          <th className="price-title">الدمغة النوعية</th>
                          <th className="num-col">{roundUp(document?.package?.qualitive_stamp + dangersQualitiveStamp)}</th>
                        </tr>
                        <tr>
                          <th className="price-title">مصاريف الإشراف والمراقبة</th>
                          <th className="num-col">{roundUp(document?.package?.supervision_expenses + dangersSupervisionExpense)} </th>
                        </tr>

                        <tr>
                          <th className="price-title">مصاريف الاصدار</th>
                          <th className="num-col">{roundUp(document?.package?.insurance_expenses + dangersInsuranceExpense)}</th>
                        </tr>

                        <tr>
                          <th className="price-title">الاجمالي</th>
                          <th className="num-col">
                            {roundUp(document?.package?.total_price + dangersTotalPrice)} {currentCurrency?.SYS_ADESC}
                          </th>
                        </tr>
                      </table>
                    </div> */}
              </div>
              <hr />
              <h3 className="text-center break-print" style={{ marginTop: "20px" }}>
                الشروط والاحكام
              </h3>
              <div>
                {document?.condition?.map((item, index) => {
                  return <div dangerouslySetInnerHTML={{ __html: item?.title?.ar }} />;
                })}
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot className="no-border">
          <tr className="no-border">
            <td className="no-border">
              <div className="footer-space">&nbsp;</div>
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="header">
        <div className="pdf-header d-flex space-between">
          <img src="https://cisegypt.com.eg/portal/logo.png" />
          <h3 style={{ maxWidth: "350px " }}>
            وثيقة {localStorage.getItem("i18nextLng") === "ar" ? document?.type?.title?.ar : document?.type?.title?.en}
            <br /> رقم {document?.POLICY_ID} / {new Date(document?.created_at).getFullYear()} <br /> المؤمن له:{" "}
            {document?.name}
          </h3>
          <img src={`http://portal.cisegypt.com.eg:8800/cis/public/${document?.qr_code}`} style={{ height: "150px" }} />
        </div>
        <hr style={{ marginTop: "10px" }} />
      </div>
      <div className="footer">
        <hr style={{ marginBottom: "0px" }} />
        <div className="d-flex space-between">
          <h4>المنتج: {user?.company_id ? user?.company?.producer_name : "إدارة"}</h4>
          {isMicrofinance && <h4>رقم المنتج: {user?.company?.producer_code}</h4>}
        </div>
        <p>
          الوثيقة التي لا تحمل باركود رقم{" "}
          <img src={`http://portal.cisegypt.com.eg:8800/cis/public/${document?.qr_code}`} className="tiny-logo" /> وبصمة
          امنية <img src="https://cisegypt.com.eg/portal/logo.png" className="tiny-logo" /> لا تعتبر اصلية
        </p>
      </div>
    </div>
  );
}

export default ReviewPrint;
