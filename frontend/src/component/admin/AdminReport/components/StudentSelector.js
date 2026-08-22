import React from "react";


function StudentSelector({

  students,
  selectedStudent,
  onSelect,
  loading

}) {

  const handleChange = (event) => {

    const code =
      event.target.value;


    const student =
      students.find(
        item =>
          String(item.code) ===
          String(code)
      );


    onSelect(
      student || null
    );

  };


  return (

    <section className="student-selector-card">

      <div className="selector-heading">

        <div className="selector-icon">
          👦
        </div>

        <div>

          <h2>
            اختيار الطفل
          </h2>

          <p>
            اختر الطفل لإضافة أو مشاهدة تقاريره
          </p>

        </div>

      </div>


      <div className="student-select-wrapper">

        <label>
          اسم الطفل
        </label>

        <select
          value={
            selectedStudent
              ? selectedStudent.code
              : ""
          }
          onChange={handleChange}
          disabled={loading}
        >

          <option value="">

            {loading
              ? "جاري تحميل الأطفال..."
              : "اختر الطفل"}

          </option>


          {students.map(
            student => (

              <option
                key={student.id}
                value={student.code}
              >

                {student.username}

              </option>

            )
          )}

        </select>

      </div>


      {selectedStudent && (

        <div className="selected-student-mini">

          <div className="mini-info">

            <span>
              👤 اسم الطفل
            </span>

            <strong>
              {selectedStudent.username}
            </strong>

          </div>


          <div className="mini-divider" />


          <div className="mini-info">

            <span>
              🔑 كود الطفل
            </span>

            <strong>
              {selectedStudent.code}
            </strong>

          </div>

        </div>

      )}

    </section>

  );

}


export default StudentSelector;