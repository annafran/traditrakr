import { Image, Grid, Text } from "@mantine/core";

export const TraditrakrLogo = () => {
  return (
    <div style={{ width: 300, marginLeft: 0, marginRight: "auto" }}>
      <Grid align="center">
        <Grid.Col span={4}>
          <Image src="traditrakrLogo.svg" alt="logo" />
        </Grid.Col>
        <Grid.Col span={8}>
          <Text>TradiTrakr</Text>
        </Grid.Col>
      </Grid>
    </div>
  );
};
