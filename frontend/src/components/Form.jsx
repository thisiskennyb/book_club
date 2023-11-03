
function Form({handleInputChange, formData}) {



  return (
    <>
    
    <div className="login">
    
     
        <div id="login_form_username" className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div id="login_form_password" className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>


        
    </div>
    </>
  );
}

export default Form;
