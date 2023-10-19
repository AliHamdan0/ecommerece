import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { TitleSection } from "../general/titleSection";
import style from "../../styles/home.module.css";
export const Awards = () => {
  return (
    <Box
      className={style.awardBox}
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "800px", lg: "620px" },
        mt: "50px",
      }}
    >
      <Image
        src="/images/salt.jpg"
        alt=""
        style={{
          objectFit: "cover",
        }}
        fill
        sizes="(min-width:100%), (max-height:100%)"
      />
      <Container maxWidth="lg" sx={{ zIndex: 2 }}>
        <Box sx={{ backgroundColor: "#fff" }}>
          <TitleSection
            subTitle="Our Company Brand"
            title="Best The Bakery Brand"
          />
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {[1, 2, 3, 4]?.map((i) => (
              <Grid item key={i} xs={12} md={6} lg={3}>
                <Box
                  className={style.flexRowCenter}
                  sx={{ flexDirection: "column" }}
                >
                  <Image
                    src={`/images/award${i}.jpg`}
                    alt=""
                    width={100}
                    height={100}
                    style={{ objectFit: "contain" }}
                  />
                  <Typography as="p">{`201${i}`}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
