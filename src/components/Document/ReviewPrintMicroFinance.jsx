import React from "react";
import { useSelector } from "react-redux";
import { roundUp } from "../../helperFunctions";

function ReviewPrintMicroFinance({ document, user }) {
  const isMicrofinance = document?.type_id == 2;
  const currencies = useSelector((state) => state.auth?.userData?.currency);
  const currentCurrency = currencies?.find((item) => item.SYS_MINOR == document?.currency_id);
  const banks = useSelector((state) => state.auth?.userData?.banks);
  const bank_branches = useSelector((state) => state.auth?.userData?.bank_branches);
  const currentBank = banks?.find((item) => item.SYS_MINOR == document?.bank_branch);
  const currentBankBranch = bank_branches?.find((item) => item.GBD_SERIAL == document?.bank_branch_id);

  console.log("CURRENCY", currentCurrency);
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
              <div className="content" style={{ marginTop: "-40px" }}>
                <div className="pdf-header d-flex space-between fields">
                  <h4>اسم المؤمن له / المستفيد: {user?.company?.name}</h4>
                  <h4>رقم العضوية: {document?.membership_id}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>الإقامة: {Boolean(user?.company_id) ? document?.customer_address : user?.address}</h4>
                  <h4>تليفون: {document?.phone}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>المهنة: {document?.work}</h4>
                  <h4>عنوان المشروع: {document?.work_address}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>تاريخ الإصدار: {new Date(document?.created_at).toLocaleDateString("ar-EG")}</h4>
                  <h4>
                    قيمة الفرض: {roundUp(document?.insurance_cost)} {currentCurrency?.SYS_ADESC}
                  </h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>مدة التأمين من: {new Date(document?.from_date).toLocaleDateString("ar-EG")}</h4>
                  <h4>إلى: {new Date(document?.to_date).toLocaleDateString("ar-EG")}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>البنك: {currentBank?.SYS_ADESC}</h4>
                  <h4>فرع البنك: {currentBankBranch?.GBD_BRANCH_NAME}</h4>
                </div>
                <div className="pdf-header d-flex space-between fields">
                  <h4>
                    مبلغ التأمين: {roundUp(document?.cover_percentage)} {currentCurrency?.SYS_ADESC}
                  </h4>
                </div>
                <hr />
                {document?.dangers?.length > 0 && (
                  <>
                    <h3 className="text-center">الاخطار الإضافية</h3>
                    <div className="d-flex flex-center">
                      <table>
                        <tr>
                          <th>م</th>
                          <th>نوع التغطية</th>
                          <th>مبلغ التأمين</th>
                          <th>قسم التغطية</th>
                        </tr>
                        {document?.dangers?.map((item, index) => {
                          return (
                            <tr>
                              <td>1</td>
                              <td>{item?.title?.ar}</td>
                              <td>
                                {item?.insurance_amount} {currentCurrency?.SYS_ADESC}
                              </td>
                              <td>1.25</td>
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  </>
                )}
                {document?.questions.length > 0 && (
                  <>
                    <h3 className="text-center">البيانات الإضافية</h3>
                    <div className="d-flex flex-center">
                      <table>
                        <tr>
                          <th>م</th>
                          <th>البيانات الإضافية</th>
                        </tr>
                        {document?.questions?.map((item, index) => {
                          return (
                            <tr>
                              <td>1</td>
                              <td>{item?.title?.ar}</td>
                            </tr>
                          );
                        })}
                      </table>
                    </div>
                  </>
                )}

                <div className="d-flex space-between">
                  <div></div>
                  <table className="prices-table">
                    <tr>
                      <th className="price-title">صافي القسط</th>
                      <th className="num-col">{document?.net_installment?.toFixed(2)}</th>
                    </tr>
                    {/* <tr>
            <th className="price-title">مبلغ التأمين</th>
            <th className="num-col">{roundUp(document?.cover_percentage)}</th>
          </tr>
          <tr>
            <th className="price-title">مبلغ القرض</th>
            <th className="num-col">{roundUp(document?.insurance_cost)}</th>
          </tr> */}
                    <tr>
                      <th className="price-title">الدمغة النسبية</th>
                      <th className="num-col">{document?.relative_stamp?.toFixed(2)}</th>
                    </tr>
                    <tr>
                      <th className="price-title">الدمغة النوعية</th>
                      <th className="num-col">{document?.qualitive_stamp?.toFixed(2)}</th>
                    </tr>
                    <tr>
                      <th className="price-title">مصاريف الإشراف والمراقبة</th>
                      <th className="num-col">{document?.supervision_expenses?.toFixed(2)}</th>
                    </tr>

                    <tr>
                      <th className="price-title">مصاريف الاصدار</th>
                      <th className="num-col">{document?.insurance_expenses?.toFixed(2)}</th>
                    </tr>

                    <tr>
                      <th className="price-title">الاجمالي</th>
                      <th className="num-col">
                        {roundUp(document?.total_price)} {currentCurrency?.SYS_ADESC}
                      </th>
                    </tr>
                  </table>
                </div>
                <h3 className="text-center break-print" style={{ marginTop: "20px" }}>
                  الشروط والاحكام
                </h3>
                <div>
                  {document?.condition?.map((item, index) => {
                    return <div dangerouslySetInnerHTML={{ __html: item?.title?.ar }} />;
                  })}
                </div>
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
          <h3 style={{ maxWidth: "350px" }}>
            وثيقة {localStorage.getItem("i18nextLng") === "ar" ? document?.type?.title?.ar : document?.type?.title?.en}
            <br /> رقم {document?.CREDIT_POLICY_ID} / {new Date(document?.created_at).getFullYear()} <br /> المؤمن عليه:{" "}
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
          {user?.company_id && <h4>رقم المنتج: {user?.company?.producer_code}</h4>}
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

export default ReviewPrintMicroFinance;
