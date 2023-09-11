import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({});

// const initialValues = {
//   performance_card: [
//     // ... (same as in your code)
//   ],
// };

type Props = {
  fields?: Array<any>;
  form: any;
  survey_Id: number;
  [x: string]: any;
};

const getFieldInfo = (fieldName: string, fields: any) => {
  const fieldInfo = fields.find(
    (field: { name: string }) => field.name.split(".")[1] === fieldName
  );

  return fieldInfo || { type: "text", options: [] };
};

const TestPerformanceCard = ({ fields, form, survey_Id }: Props) => {
  const { values, handleChange, handleBlur, touched, errors } = form;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            {values.performance_card.map((_: any, index: number) => (
              <th key={`index${index}`}>Index {index + 1} (values)</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(values.performance_card[0] || {}).map((fieldName) => (
            <tr key={fieldName}>
              <td>
                <label htmlFor={fieldName}>{fieldName}</label>
              </td>
              {values.performance_card.map(
                (
                  performance: {
                    [x: string]: string | number | readonly string[];
                  },
                  index: string | number
                ) => {
                  const fieldInfo = getFieldInfo(fieldName, fields);
                  const { type, options } = fieldInfo;

                  return (
                    <td key={`index${index}`}>
                      {type === "select" ? (
                        <select
                          name={`performance_card[${index}].${fieldName}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={performance[fieldName]}
                        >
                          {options.map((option: string | number) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={type}
                          name={`performance_card[${index}].${fieldName}`}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={performance[fieldName]}
                        />
                      )}
                      {touched.performance_card &&
                      errors.performance_card &&
                      errors.performance_card[index] &&
                      errors.performance_card[index][fieldName] ? (
                        <div>{errors.performance_card[index][fieldName]}</div>
                      ) : null}
                    </td>
                  );
                }
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
