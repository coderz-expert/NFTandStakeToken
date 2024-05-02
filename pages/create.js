import React from "react";


const CreatePool = () => {
  return (
    <div className="createpool_main">
      <div className="createpool_inside">
        <h1 className="create_head">CREATE LBP POOL</h1>

        <form className="create_form_main">

          <div className="create_form_one">
            <div className="form_inside_one">
              <div className="form_inside">
                <h4>PROJECT NAME *</h4>
                <input type="text" id="proname" name="proname" placeholder="Enter the name of your project" />
              </div>

              <div className="form_inside">
                <h4>PROJECT SUMMARY *</h4>
                <textarea id="prosum" name="prosum" rows="4" cols="50" placeholder="Tell us about your project">
                </textarea>
              </div>
            </div>

            <div className="form_inside_two">
              <div className="form_inside">
                <h4>UPLOAD ICON</h4>
                <input type="file" id="iconImg" name="iconImg" />
              </div>
            </div>
          </div>

          <hr />

          <div className="start_time_main">
            <div className="form_inside">
              <h4>START TIME *</h4>
              <input type="datetime-local" id="stime" name="stime" />
            </div>

            <div className="form_inside">
              <h4>END TIME *</h4>
              <input type="datetime-local" id="etime" name="etime" />
            </div>
          </div>

          <hr />

          <div className="weight_main">
            <div className="weight_inside">
              <div className="form_inside">
                <h4>Start Weight</h4>
                <input type="range" id="sweight" name="sweight" min="1" max="99" />
              </div>

              <div className="form_inside">
                <h4>End Weight</h4>
                <input type="range" id="eweight" name="eweight" min="1" max="99" />
              </div>
            </div>

            <p className="weight_desc">These weights will cause the price to naturally fall over time</p>
          </div>

          <hr />

          <div className="project_web_main">
            <p className="external_head">External link fields are optional - leave blank if not applicable.</p>
            <p className="changeval_head">(you will not be able to change these values later)</p>

            <div className="project_url_main">
              <div className="form_inside">
                <h4>PROJECT WEBSITE</h4>
                <input type="text" id="proweb" name="proweb" placeholder="Enter Project URL" />
              </div>

              <div className="form_inside">
                <h4>WHITEPAPER URL</h4>
                <input type="text" id="whiteurl" name="whiteurl" placeholder="Enter Whitepaper URL" />
              </div>
            </div>

            <div className="social_input">

              <div className="social_input_inside">
                <h4>TWITTER</h4>
                <input type="text" id="stwitter" name="stwitter" placeholder="twitter" />
              </div>

              <div className="social_input_inside">
                <h4>TELEGRAM</h4>
                <input type="text" id="stelegram" name="stelegram" placeholder="telegram" />
              </div>

              <div className="social_input_inside">
                <h4>EMAIL</h4>
                <input type="email" id="semail" name="semail" placeholder="email" />
              </div>

            </div>
          </div>

          <hr />

          <div className="fund_token_main">
            <div className="form_inside">
              <h4>TOKEN *</h4>
              <input type="text" id="ctoken" name="ctoken" placeholder="paste token address" />
            </div>

            <div className="form_inside">
              <h4>FUND TOKEN *</h4>
              <select className="borderless">
                <option>
                  - select fund token -
                </option>
                <option value="0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"> WETH </option>
                <option value="0x6B175474E89094C44Da98b954EedeAC495271d0F"> DAI </option>
                <option value="0x38A94e92A19E970c144DEd0B2DD47278CA11CC1F"> F9 </option>
                <option value="0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"> WBTC </option>
                <option value="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"> USDC </option>
                <option value="0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE"> SHIB </option>
                <option value="0x0000000000000000000000000000000000000000"> ETH </option>
              </select>
            </div>
          </div>

          <hr />

          <div className="form_btn_main">
            <button className="submit_lbp">Submit LBP Project</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreatePool;